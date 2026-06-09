"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    setImages(data || []);
  }

  const filtered =
    filter === "Todos"
      ? images
      : images.filter(
          (img) => img.category === filter
        );

  return (
    <section className="bg-black py-20 px-6">

      <h2 className="text-5xl font-bold text-center text-[#D4AF37] mb-10">
        NUESTROS TRABAJOS
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10">

        {[
          "Todos",
          "Fade",
          "Mullet",
          "Barba",
          "Diseños",
          "Antes y Después",
        ].map((cat) => (

          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="
              px-4 py-2
              rounded-lg
              border
              border-red-900
              hover:bg-red-900
            "
          >
            {cat}
          </button>

        ))}

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((image) => (

          <div
            key={image.id}
            className="overflow-hidden rounded-xl border border-red-900"
          >
            <img
              src={image.image_url}
              alt={image.title}
              className="
                w-full
                h-72
                object-cover
                hover:scale-110
                transition
                duration-300
              "
            />

            <div className="p-4 bg-[#120000]">

              <h3 className="font-bold">
                {image.title}
              </h3>

              <p className="text-gray-400">
                {image.category}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}