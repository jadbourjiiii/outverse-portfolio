"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function ProjectCarousel({ project }) {
  const touchStartX = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = useMemo(() => {
    const list = [];

    if (project?.image_url) {
      list.push(project.image_url);
    }

    if (Array.isArray(project?.gallery)) {
      project.gallery.forEach((url) => {
        if (url && !list.includes(url)) {
          list.push(url);
        }
      });
    }

    return list;
  }, [project]);

  const total = images.length;

  const goNext = () => {
    if (!total) return;
    setCurrent((value) => (value + 1) % total);
  };

  const goPrevious = () => {
    if (!total) return;
    setCurrent((value) => (value - 1 + total) % total);
  };

  const openProject = () => {
    setCurrent(0);
    setIsOpen(true);
  };

  const closeProject = () => {
    setIsOpen(false);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeProject();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, total]);

  if (!total) {
    return (
      <div
        className="work-tile cursor-pointer"
        onClick={openProject}
      >
        <span className="label">
          {project?.name || "Project"}
        </span>
      </div>
    );
  }

  return (
    <>
      {/* PROJECT CARD */}
      <div
        className="work-tile relative cursor-pointer overflow-hidden"
        onClick={openProject}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[current]}
          alt={project?.name || "Project"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
            {project?.category || "Project"}
          </div>

          <div className="text-base font-bold text-white">
            {project?.name}
          </div>

          {project?.description && (
            <div className="mt-1 line-clamp-2 text-xs text-white/70">
              {project.description}
            </div>
          )}

          {total > 1 && (
            <div className="mt-3 flex items-center gap-1.5">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === current
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN PROJECT */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto bg-black text-white">

          {/* STICKY BACK BUTTON */}
          <div className="sticky top-0 z-[10010] px-4 pt-4 md:px-8 md:pt-6">
            <button
              type="button"
              onClick={closeProject}
              className="flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-black/80 px-6 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition hover:bg-white/10"
            >
              <span className="text-xl leading-none">←</span>
              <span>Projects</span>
            </button>
          </div>

          {/* PROJECT CONTENT */}
          <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 md:px-10 md:pt-10">

            {/* HEADER */}
            <section className="mb-10">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                {project?.category || "Project"}
              </div>

              <h1 className="max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
                {project?.name || "Project"}
              </h1>

              {project?.description && (
                <p className="mt-6 max-w-4xl text-base leading-8 text-white/65 md:text-lg md:leading-9">
                  {project.description}
                </p>
              )}
            </section>

            {/* ONE IMAGE AT A TIME */}
            <section
              className="relative overflow-hidden rounded-3xl bg-white/[0.03]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative flex min-h-[55vh] w-full items-center justify-center md:min-h-[65vh]">

                <img
                  src={images[current]}
                  alt={project?.name || "Project"}
                  className="max-h-[75vh] w-full select-none object-contain"
                  draggable={false}
                />

                {/* PREVIOUS */}
                {total > 1 && (
                  <button
                    type="button"
                    onClick={goPrevious}
                    className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white backdrop-blur-md transition hover:bg-black"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}

                {/* NEXT */}
                {total > 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white backdrop-blur-md transition hover:bg-black"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>
            </section>

            {/* IMAGE INDICATOR */}
            {total > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to image ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      index === current
                        ? "w-9 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* SWIPE HINT */}
            {total > 1 && (
              <div className="mt-4 text-center text-xs text-white/35">
                Swipe left or right
              </div>
            )}

            {/* DESCRIPTION */}
            {project?.description && (
              <section className="mt-16 max-w-4xl">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  About this project
                </div>

                <p className="text-base leading-8 text-white/70 md:text-lg md:leading-9">
                  {project.description}
                </p>
              </section>
            )}

            {/* BOTTOM */}
            <div className="mt-20 border-t border-white/10 pt-10">
              <button
                type="button"
                onClick={closeProject}
                className="flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span className="text-xl">←</span>
                <span>Projects</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
