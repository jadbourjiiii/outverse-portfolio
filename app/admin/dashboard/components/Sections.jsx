"use client";

import { useState } from "react";

export default function Sections() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      title: "Outverse Cover",
      url: "/images/outverse-cover.jpg",
    },
    {
      id: 2,
      title: "Project Image",
      url: "/images/project-1.jpg",
    },
    {
      id: 3,
      title: "Project Image 2",
      url: "/images/project-2.jpg",
    },
    {
      id: 4,
      title: "Project Image 3",
      url: "/images/project-3.jpg",
    },
  ];

  const currentIndex = selectedImage
    ? images.findIndex((image) => image.id === selectedImage.id)
    : -1;

  const previousImage = () => {
    if (currentIndex <= 0) return;

    setSelectedImage(images[currentIndex - 1]);
  };

  const nextImage = () => {
    if (currentIndex === -1 || currentIndex >= images.length - 1) return;

    setSelectedImage(images[currentIndex + 1]);
  };

  return (
    <>
      {/* PAGE */}
      <div className="min-h-screen w-full bg-[#050507] text-white">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e8251c] shadow-[0_0_12px_#e8251c]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a9aa5]">
              Website Management
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Content
              </h1>

              <p className="mt-2 text-sm text-[#9a9aa5]">
                Manage your website content and media.
              </p>
            </div>

            <button
              className="w-full rounded-xl bg-gradient-to-r from-[#e8251c] to-[#d6336c] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 hover:shadow-red-900/40 sm:w-auto"
            >
              + Add Content
            </button>
          </div>
        </div>

        {/* IMAGE LIBRARY */}
        <div className="rounded-3xl border border-[#1e1e26] bg-[#0d0d12] p-5 shadow-2xl sm:p-6">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Image Library
              </h2>

              <p className="mt-1 text-xs text-[#9a9aa5]">
                Click any image to preview it.
              </p>
            </div>

            <span className="rounded-full border border-[#1e1e26] bg-[#050507] px-3 py-1.5 text-xs font-semibold text-[#9a9aa5]">
              {images.length} Images
            </span>
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#1e1e26] bg-[#050507] text-left transition duration-300 hover:-translate-y-1 hover:border-[#e8251c]/50 hover:shadow-xl hover:shadow-red-950/20"
              >

                <img
                  src={image.url}
                  alt={image.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* NUMBER */}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-xs font-bold text-white backdrop-blur">
                  {image.id}
                </div>

                {/* TITLE */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold text-white">
                    {image.title}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                    Image #{image.id}
                  </p>
                </div>

              </button>
            ))}

            {/* ADD IMAGE */}
            <button className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-dashed border-[#2a2a35] bg-[#08080c] transition hover:border-[#e8251c]/60 hover:bg-[#e8251c]/5">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8251c] to-[#d6336c] text-2xl font-light shadow-lg shadow-red-950/30 transition group-hover:scale-110">
                +
              </div>

              <span className="mt-3 text-sm font-semibold">
                Add Image
              </span>

              <span className="mt-1 text-xs text-[#9a9aa5]">
                Upload media
              </span>

            </button>

          </div>
        </div>

      </div>

      {/* =====================================================
          IMAGE PREVIEW MODAL
      ===================================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >

          {/* CLOSE */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20"
          >
            ×
          </button>

          {/* PREVIOUS */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            disabled={currentIndex <= 0}
            className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white backdrop-blur transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-20 sm:left-8"
          >
            ‹
          </button>

          {/* NEXT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            disabled={currentIndex >= images.length - 1}
            className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white backdrop-blur transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-20 sm:right-8"
          >
            ›
          </button>

          {/* IMAGE CONTAINER */}
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-[#e8251c] to-[#d6336c] px-3 py-1 text-xs font-bold text-white">
                {currentIndex + 1} / {images.length}
              </span>

              <span className="text-sm font-semibold text-white">
                {selectedImage.title}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12] shadow-2xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] max-w-[85vw] object-contain"
              />
            </div>

            <div className="mt-4 text-center text-xs text-white/40">
              Use the arrows to browse images
            </div>

          </div>
        </div>
      )}
    </>
  );
}