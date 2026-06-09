"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("REVIEWS DATA:", data);
    console.log("REVIEWS ERROR:", error);

    if (error) {
      alert("Error al cargar reseñas");
      console.error(error);
    }

    setReviews(data || []);
    setLoading(false);
  }

  async function approveReview(id: number) {
    const { error } = await supabase
      .from("reviews")
      .update({
        aprobada: true,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al aprobar");
      return;
    }

    loadReviews();
  }

  async function deleteReview(id: number) {
    const ok = confirm(
      "¿Eliminar esta reseña?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al eliminar");
      return;
    }

    loadReviews();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-[#D4AF37] mb-10">
        RESEÑAS CHINO BARBER
      </h1>

      {loading && (
        <p className="text-xl">
          Cargando reseñas...
        </p>
      )}

      {!loading && reviews.length === 0 && (
        <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
          <p className="text-xl">
            No hay reseñas registradas.
          </p>
        </div>
      )}

      <div className="grid gap-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="
              bg-[#120000]
              border
              border-red-900
              rounded-xl
              p-6
            "
          >

            <div className="flex justify-between items-center mb-3">

              <h2 className="text-2xl font-bold">
                {review.nombre}
              </h2>

              <span
                className={
                  review.aprobada
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {review.aprobada
                  ? "Aprobada"
                  : "Pendiente"}
              </span>

            </div>

            <div className="text-yellow-400 text-2xl mb-3">
              {"⭐".repeat(review.estrellas || 0)}
            </div>

            <p className="mb-4">
              {review.comentario}
            </p>

            <p className="text-gray-400 text-sm mb-4">
              {review.created_at
                ? new Date(
                    review.created_at
                  ).toLocaleString("es-CL")
                : "Sin fecha"}
            </p>

            <div className="flex gap-3">

              {!review.aprobada && (
                <button
                  onClick={() =>
                    approveReview(review.id)
                  }
                  className="
                    bg-green-700
                    px-4
                    py-2
                    rounded
                  "
                >
                  Aprobar
                </button>
              )}

              <button
                onClick={() =>
                  deleteReview(review.id)
                }
                className="
                  bg-red-700
                  px-4
                  py-2
                  rounded
                "
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