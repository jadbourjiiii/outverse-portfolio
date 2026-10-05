import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files selected" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== "function") {
        continue;
      }

      if (!file.type?.startsWith("image/")) {
        return NextResponse.json(
          { error: `Only image files are allowed: ${file.name}` },
          { status: 400 }
        );
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `${file.name} is larger than 10MB` },
          { status: 400 }
        );
      }

      const extension = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const fileBuffer = await file.arrayBuffer();

      const { error: uploadError } = await supabaseAdmin.storage
        .from("project-images")
        .upload(fileName, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);

        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("project-images")
        .getPublicUrl(fileName);

      uploadedImages.push({
        name: file.name,
        url: publicUrlData.publicUrl,
        path: fileName,
      });
    }

    return NextResponse.json(
      {
        success: true,
        images: uploadedImages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/admin/projects/upload error:", error);

    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
