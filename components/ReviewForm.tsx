"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ReviewForm() {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(5);

  async function sendReview() {
    if (!nombre || !comentario) {
      alert("Completa todos los campos");
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          nombre,
          comentario,
          estrellas,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Error al enviar reseña");
      return;
    }

    alert(
      "¡Gracias! Tu reseña será revisada antes de publicarse."
    );

    setNombre("");
    setComentario("");
    setEstrellas(5);
  }

  return (
    <section className="bg-[#120000] py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl text-center font-bold text-[#D4AF37] mb-8">
          DEJA TU RESEÑA
        </h2>

        <div className="bg-black border border-red-900 rounded-2xl p-8 grid gap-4">

          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-4 rounded bg-[#1a1a1a] border border-red-900"
          />

          <textarea
            placeholder="¿Qué te pareció el servicio?"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={5}
            className="p-4 rounded bg-[#1a1a1a] border border-red-900"
          />

          <select
            value={estrellas}
            onChange={(e) =>
              setEstrellas(Number(e.target.value))
            }
            className="p-4 rounded bg-[#1a1a1a] border border-red-900"
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

          <button
            onClick={sendReview}
            className="
              bg-[#8B0000]
              hover:bg-[#B22222]
              p-4
              rounded-xl
              font-bold
            "
          >
            ENVIAR RESEÑA
          </button>

        </div>

      </div>
    </section>
  );
}