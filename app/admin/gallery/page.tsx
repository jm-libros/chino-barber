"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function GalleryAdmin() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fade");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  async function uploadImage() {
    if (!file) {
      alert("Selecciona una imagen");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Error al subir imagen");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    await supabase.from("gallery").insert([
      {
        title,
        category,
        image_url: data.publicUrl,
      },
    ]);

    setTitle("");
    setFile(null);

    loadImages();
    setLoading(false);

    alert("Imagen subida correctamente");
  }

  async function deleteImage(id: number) {
    const confirmDelete = confirm(
      "¿Eliminar esta imagen?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    loadImages();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-[#D4AF37] mb-10">
        GALERÍA CHINO BARBER
      </h1>

      <div className="bg-[#120000] border border-red-900 rounded-xl p-6 mb-10">

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 mb-4 rounded bg-black border border-red-900"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full p-3 mb-4 rounded bg-black border border-red-900"
        >
          <option>Fade</option>
          <option>Mullet</option>
          <option>Barba</option>
          <option>Diseños</option>
          <option>Antes y Después</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(
              e.target.files
                ? e.target.files[0]
                : null
            )
          }
          className="mb-4"
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-green-700 px-6 py-3 rounded"
        >
          {loading
            ? "Subiendo..."
            : "Subir Imagen"}
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {images.map((image) => (

          <div
            key={image.id}
            className="bg-[#120000] border border-red-900 rounded-xl overflow-hidden"
          >
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {image.title}
              </h3>

              <p className="text-gray-400">
                {image.category}
              </p>

              <button
                onClick={() =>
                  deleteImage(image.id)
                }
                className="mt-4 bg-red-700 px-4 py-2 rounded"
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}