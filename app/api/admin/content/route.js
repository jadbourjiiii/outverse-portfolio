import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("id, section, content_key, content_value, updated_at")
      .order("id", { ascending: true });

    if (error) {
      console.error("GET /api/admin/content error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/content fatal error:", error);

    return NextResponse.json(
      { error: "Failed to load website content" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();

    const { section, content_key, content_value } = body;

    if (!section || !content_key) {
      return NextResponse.json(
        {
          error: "section and content_key are required",
        },
        { status: 400 }
      );
    }

    const value =
      typeof content_value === "string"
        ? content_value
        : String(content_value ?? "");

    const { data, error } = await supabaseAdmin
      .from("site_content")
      .upsert(
        {
          section,
          content_key,
          content_value: value,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "section,content_key",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("PATCH /api/admin/content error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Homepage uses this content.
    revalidatePath("/");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/content fatal error:", error);

    return NextResponse.json(
      { error: "Failed to save website content" },
      { status: 500 }
    );
  }
}
