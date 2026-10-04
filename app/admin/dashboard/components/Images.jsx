"use client";

import { useEffect, useState } from "react";

export default function Images() {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
      name: "Creative Workspace",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      name: "Modern Office",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      name: "Team Meeting",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
      name: "Digital Design",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      name: "Collaboration",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      name: "Business Team",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [selectedIndex]);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      src: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((current) => [...current, ...newImages]);

    event.target.value = "";
  };

  const deleteImage = (id) => {
    setImages((current) => current.filter((image) => image.id !== id));

    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  };

  return (
    <div className="relative min-h-full w-full overflow-hidden text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-red-600/[0.07] blur-[130px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-pink-600/[0.06] blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(232,37,28,.8)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Media Library
            </span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Images
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Manage the images used across your Outverse website.
              </p>
            </div>

            {/* Upload */}
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_rgba(232,37,28,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(232,37,28,.3)]">
              <span className="text-lg">+</span>
              Upload Images

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* TOP INFO */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Total Images
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {images.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Library
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              Active
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4 sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Viewer
            </p>

            <p className="mt-2 text-2xl font-bold text-red-400">
              Ready
            </p>
          </div>

        </div>

        {/* IMAGE GRID */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">

            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d12] shadow-[0_20px_60px_rgba(0,0,0,.15)]"
              >

                {/* IMAGE */}
                <button
                  type="button"
                  onClick={() => openImage(index)}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                >
                  <img
                    src={image.src}
                    alt={image.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/45">
                    <span className="translate-y-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-bold text-white opacity-0 backdrop-blur-md transition group-hover:translate-y-0 group-hover:opacity-100">
                      View Image
                    </span>
                  </div>

                  {/* Number */}
                  <div className="absolute left-3 top-3 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                    #{String(index + 1).padStart(2, "0")}
                  </div>
                </button>

                {/* Bottom info */}
                <div className="flex items-center justify-between gap-2 p-3">

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      {image.name}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-white/25">
                      Image {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteImage(image.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-xs text-white/30 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    title="Delete image"
                  >
                    ×
                  </button>

                </div>
              </div>
            ))}

          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.1] bg-[#0d0d12] px-6 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.025] text-3xl text-white/20">
              ◇
            </div>

            <h2 className="text-lg font-bold text-white">
              No images yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/30">
              Upload your first image to start building your media library.
            </p>

            <label className="mt-6 cursor-pointer rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-xs font-bold text-white">
              Upload First Image

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </label>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* FULLSCREEN IMAGE VIEWER */}
      {/* ========================================================= */}

      {selectedIndex !== null && images[selectedIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={closeImage}
        >

          {/* Viewer */}
          <div
            className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >

            {/* TOP BAR */}
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                  Image {String(selectedIndex + 1).padStart(2, "0")}
                </p>

                <p className="mt-1 max-w-[220px] truncate text-sm font-semibold text-white">
                  {images[selectedIndex].name}
                </p>
              </div>

              <button
                type="button"
                onClick={closeImage}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close image"
              >
                ×
              </button>

            </div>

            {/* IMAGE */}
            <div className="flex max-h-[75vh] w-full items-center justify-center px-10 sm:px-16">

              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].name}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />

            </div>

            {/* LEFT BUTTON */}
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-2xl text-white/70 backdrop-blur-md transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-white sm:h-14 sm:w-14"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* RIGHT BUTTON */}
            <button
              type="button"
              onClick={showNext}
              className="absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-2xl text-white/70 backdrop-blur-md transition hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-white sm:h-14 sm:w-14"
              aria-label="Next image"
            >
              ›
            </button>

            {/* BOTTOM COUNTER */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">

              <div className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-xs font-bold text-white/70 backdrop-blur-md">
                {String(selectedIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-white/20">/</span>
                {String(images.length).padStart(2, "0")}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}