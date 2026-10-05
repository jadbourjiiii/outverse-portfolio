import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(request, { params }) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const id = params.id;
    const body = await request.json();

    const {
      name,
      category,
      description,
      image_url,
      gallery,
      status,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const updateData = {
      name: name.trim(),
      category: category?.trim() || "General",
      description: description?.trim() || "",
      image_url: image_url?.trim() || null,
      gallery: Array.isArray(gallery) ? gallery : [],
      status: status || "Draft",
    };

    const { data, error } = await supabaseAdmin
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("PATCH /api/admin/projects/[id] error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          error: `Project with ID ${id} was not found or could not be updated.`,
        },
        { status: 404 }
      );
    }

    revalidatePath("/");

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/projects/[id] fatal error:", error);

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("DELETE /api/admin/projects/[id] error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: `Project with ID ${id} was not found.` },
        { status: 404 }
      );
    }

    revalidatePath("/");

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/projects/[id] fatal error:", error);

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
