"use client";

import { useEffect, useRef, useState } from "react";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  image_url: "",
  gallery: [],
  status: "Draft",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const fileInputRef = useRef(null);

  // =========================
  // LOAD PROJECTS
  // =========================

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/projects", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load projects");
      }

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD PROJECTS ERROR:", error);
      alert("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // =========================
  // UPLOAD GALLERY IMAGES
  // =========================

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    try {
      setUploading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/admin/projects/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload images");
      }

      const newImages = Array.isArray(data.images)
        ? data.images.map((image) => image.url).filter(Boolean)
        : [];

      setForm((current) => ({
        ...current,
        gallery: [...current.gallery, ...newImages],
      }));

      event.target.value = "";

    } catch (error) {
      console.error("GALLERY UPLOAD ERROR:", error);
      alert(error.message || "Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // REMOVE GALLERY IMAGE
  // =========================

  const removeGalleryImage = (index) => {
    setForm((current) => ({
      ...current,
      gallery: current.gallery.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  // =========================
  // ADD PROJECT
  // =========================

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Project name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category.trim(),
          description: form.description.trim(),
          image_url: form.image_url.trim(),
          gallery: form.gallery,
          status: form.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setProjects((current) => [data, ...current]);

      setForm({ ...emptyForm });
      setShowAdd(false);

    } catch (error) {
      console.error("ADD PROJECT ERROR:", error);
      alert(error.message || "Failed to create project.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // OPEN EDIT
  // =========================

  const openEdit = (project) => {
    setEditingProject(project);

    setForm({
      name: project.name || "",
      category: project.category || "",
      description: project.description || "",
      image_url: project.image_url || "",
      gallery: Array.isArray(project.gallery)
        ? project.gallery.filter(Boolean)
        : [],
      status: project.status || "Draft",
    });

    setShowEdit(true);
  };

  // =========================
  // EDIT PROJECT
  // =========================

  const handleEditProject = async (e) => {
    e.preventDefault();

    if (!editingProject) return;

    if (!form.name.trim()) {
      alert("Project name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/admin/projects/${editingProject.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            category: form.category.trim(),
            description: form.description.trim(),
            image_url: form.image_url.trim(),
            gallery: form.gallery,
            status: form.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update project");
      }

      setProjects((current) =>
        current.map((project) =>
          project.id === editingProject.id
            ? data
            : project
        )
      );

      setShowEdit(false);
      setEditingProject(null);
      setForm({ ...emptyForm });

    } catch (error) {
      console.error("EDIT PROJECT ERROR:", error);
      alert(error.message || "Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete project");
      }

      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );

    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);
      alert(error.message || "Failed to delete project.");
    }
  };

  // =========================
  // FORM
  // =========================

  const renderForm = (onSubmit, title) => (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={() => {
        if (!saving && !uploading) {
          setShowAdd(false);
          setShowEdit(false);
        }
      }}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#0d0d12] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="mb-6 flex items-start justify-between">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-400">
              Project Management
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {title}
            </h2>
          </div>

          <button
            type="button"
            disabled={saving || uploading}
            onClick={() => {
              setShowAdd(false);
              setShowEdit(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-xl text-white/40 hover:text-white"
          >
            ×
          </button>

        </div>

        <form onSubmit={onSubmit} className="space-y-4">

          {/* NAME */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-white/50">
              Project Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="e.g. Outverse Portfolio"
              required
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-red-500/50"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-white/50">
              Category
            </label>

            <input
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              placeholder="Web Design"
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-red-500/50"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-white/50">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Describe the project..."
              rows={4}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 p-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-red-500/50"
            />
          </div>

          {/* MAIN IMAGE URL */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-white/50">
              Main Image URL
            </label>

            <input
              value={form.image_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  image_url: e.target.value,
                })
              }
              placeholder="https://..."
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-red-500/50"
            />
          </div>

          {/* GALLERY */}

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-xs font-semibold text-white/50">
                Gallery Images
              </label>

              <span className="text-[10px] text-white/25">
                {form.gallery.length} image{form.gallery.length === 1 ? "" : "s"}
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.025] text-sm font-semibold text-white/60 transition hover:border-red-500/40 hover:bg-red-500/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-lg">
                {uploading ? "↑" : "+"}
              </span>

              {uploading
                ? "Uploading..."
                : "Choose Gallery Images"}
            </button>

            <p className="mt-2 text-[11px] text-white/25">
              You can select one image or multiple images at once.
            </p>

            {form.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {form.gallery.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.08] bg-black/30"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      disabled={saving || uploading}
                      onClick={() => removeGalleryImage(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-sm font-bold text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-red-600 disabled:cursor-not-allowed"
                    >
                      ×
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1.5 text-[9px] font-semibold text-white/70 backdrop-blur-sm">
                      Image {index + 1}
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-2 block text-xs font-semibold text-white/50">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#09090c] px-4 text-sm text-white outline-none focus:border-red-500/50"
            >
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
            </select>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={saving || uploading}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : showEdit
                ? "Save Changes"
                : "Create Project"}
          </button>

        </form>

      </div>
    </div>
  );

  // =========================
  // UI
  // =========================

  return (
    <div className="relative min-h-full overflow-hidden text-white">

      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-red-600/[0.07] blur-[130px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-pink-600/[0.06] blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(232,37,28,.8)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Project Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Projects
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Create, edit and manage the projects displayed on your
              Outverse website.
            </p>
          </div>

          <button
            onClick={() => {
              setForm({ ...emptyForm });
              setShowAdd(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_rgba(232,37,28,.18)] transition hover:-translate-y-0.5"
          >
            <span className="text-lg">+</span>
            Add Project
          </button>

        </div>

        {/* STATS */}

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Total Projects
            </p>

            <p className="mt-2 text-2xl font-bold">
              {projects.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Live
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {projects.filter((p) => p && p.status === "Live").length}
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4 sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Drafts
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-400">
              {projects.filter((p) => p && p.status === "Draft").length}
            </p>
          </div>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/[0.07] bg-[#0d0d12]">
            <p className="text-sm text-white/30">
              Loading projects...
            </p>
          </div>
        ) : projects.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {projects.filter(Boolean).map((project, index) => (

              <div
                key={project.id}
                className="group overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0d0d12] transition duration-300 hover:-translate-y-1 hover:border-white/[0.13]"
              >

                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-red-600 to-pink-600">

                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/20" />

                      <div className="relative flex h-full items-center justify-center text-6xl font-black text-white/20">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </>
                  )}

                  <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      project.status === "Live"
                        ? "bg-emerald-400/15 text-emerald-200"
                        : "bg-orange-400/15 text-orange-200"
                    }`}
                  >
                    {project.status}
                  </div>

                </div>

                <div className="p-5">

                  <div className="mb-3">

                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">
                      {project.category || "General"}
                    </p>

                    <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
                      {project.name}
                    </h2>

                  </div>

                  <p className="min-h-[48px] text-sm leading-6 text-white/35">
                    {project.description || "No description added."}
                  </p>

                  <div className="mt-5 flex gap-2 border-t border-white/[0.06] pt-4">

                    <button
                      onClick={() => openEdit(project)}
                      className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.1] bg-[#0d0d12] text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.025] text-3xl text-white/20">
              ◆
            </div>

            <h2 className="text-lg font-bold">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-white/30">
              Create your first project to get started.
            </p>

            <button
              onClick={() => {
                setForm({ ...emptyForm });
                setShowAdd(true);
              }}
              className="mt-6 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-xs font-bold"
            >
              + Create Project
            </button>

          </div>

        )}

      </div>

      {showAdd &&
        renderForm(handleAddProject, "Add Project")}

      {showEdit &&
        renderForm(handleEditProject, "Edit Project")}

    </div>
  );
}
