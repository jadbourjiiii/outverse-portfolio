"use client";

import { useEffect, useState } from "react";

const fields = {
  Homepage: [
    {
      key: "hero_title",
      title: "Hero Title",
      description: "Main headline displayed on the homepage.",
      section: "homepage",
    },
    {
      key: "hero_description",
      title: "Hero Description",
      description: "Short description below the main headline.",
      section: "homepage",
    },
    {
      key: "primary_button",
      title: "Primary Button",
      description: "Main call-to-action button.",
      section: "homepage",
    },
  ],

  About: [
    {
      key: "about_title",
      title: "About Title",
      description: "Main heading for the About section.",
      section: "about",
    },
    {
      key: "about_description",
      title: "About Description",
      description: "Description displayed in the About section.",
      section: "about",
    },
  ],

  Contact: [
    {
      key: "contact_title",
      title: "Contact Title",
      description: "Main contact section heading.",
      section: "contact",
    },
    {
      key: "contact_description",
      title: "Contact Description",
      description: "Text displayed above your contact information.",
      section: "contact",
    },
  ],
};

export default function Content() {
  const [activeTab, setActiveTab] = useState("Homepage");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/content", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load content");
        }

        const mapped = {};

        data.forEach((item) => {
          mapped[`${item.section}.${item.content_key}`] =
            item.content_value;
        });

        setContent(mapped);
      } catch (err) {
        console.error("Content load error:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  const getValue = (field) => {
    return content[`${field.section}.${field.key}`] || "";
  };

  const updateValue = (field, value) => {
    const id = `${field.section}.${field.key}`;

    setContent((previous) => ({
      ...previous,
      [id]: value,
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const allFields = Object.values(fields).flat();

      await Promise.all(
        allFields.map(async (field) => {
          const response = await fetch("/api/admin/content", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              section: field.section,
              content_key: field.key,
              content_value: getValue(field),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || `Failed to save ${field.key}`
            );
          }
        })
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error("Content save error:", err);
      setError(err.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const currentFields = fields[activeTab];

  return (
    <div className="relative min-h-full w-full overflow-hidden text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-pink-600/10 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(232,37,28,.8)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Website Content
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Content
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Manage the text and information displayed across your website.
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_rgba(232,37,28,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(232,37,28,.3)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : saved
                ? "✓ Saved"
                : "Save Changes"}
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* TABS */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-2">
            {Object.keys(fields).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-900/20"
                    : "text-white/35 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">

          <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5 shadow-[0_20px_60px_rgba(0,0,0,.18)] sm:p-6">

            <div className="mb-6 border-b border-white/[0.06] pb-5">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/15 to-pink-500/15 text-red-400">
                  ✦
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    {activeTab} Content
                  </h2>

                  <p className="mt-1 text-[10px] text-white/30">
                    Edit the information shown on this page.
                  </p>
                </div>

              </div>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 text-sm text-white/40">
                Loading content...
              </div>
            ) : (
              <div className="space-y-5">

                {currentFields.map((field) => {
                  const value = getValue(field);

                  return (
                    <div
                      key={field.key}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4 transition hover:border-red-500/20"
                    >

                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                        {field.title}
                      </label>

                      <p className="mb-3 text-[10px] text-white/25">
                        {field.description}
                      </p>

                      {field.key.includes("description") ? (
                        <textarea
                          value={value}
                          onChange={(event) =>
                            updateValue(field, event.target.value)
                          }
                          rows={4}
                          className="w-full resize-none rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/[0.06]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(event) =>
                            updateValue(field, event.target.value)
                          }
                          className="h-12 w-full rounded-xl border border-white/[0.07] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/[0.06]"
                        />
                      )}

                    </div>
                  );
                })}

              </div>
            )}

          </section>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5">

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Publishing
                </h3>

                <span className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE
                </span>
              </div>

              <p className="text-xs leading-5 text-white/30">
                Your website content is currently published and visible to
                visitors.
              </p>

            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5">

              <h3 className="mb-4 text-sm font-bold text-white">
                Content Overview
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35">
                    Sections
                  </span>

                  <span className="text-xs font-bold text-white">
                    3
                  </span>
                </div>

                <div className="h-px bg-white/[0.05]" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35">
                    Editable fields
                  </span>

                  <span className="text-xs font-bold text-white">
                    7
                  </span>
                </div>

                <div className="h-px bg-white/[0.05]" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35">
                    Status
                  </span>

                  <span className="text-xs font-bold text-emerald-400">
                    Active
                  </span>
                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.035] p-5">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                !
              </div>

              <h3 className="text-sm font-bold text-white">
                Before publishing
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-white/30">
                Make sure your content is correct before saving. Changes may
                appear immediately on the live website.
              </p>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}