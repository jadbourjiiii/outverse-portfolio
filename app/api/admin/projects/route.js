import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/admin/projects error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/projects fatal error:", error);

    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      category,
      description,
      image_url,
      gallery,
      status,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert([
        {
          name: name.trim(),
          category: category?.trim() || "General",
          description: description?.trim() || "",
          image_url: image_url?.trim() || null,
          gallery: Array.isArray(gallery) ? gallery : [],
          status: status || "Draft",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("POST /api/admin/projects error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    revalidatePath("/");

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/projects fatal error:", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE /api/admin/projects error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    revalidatePath("/");

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/projects fatal error:", error);

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
