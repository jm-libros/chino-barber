"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setReviews(data || []);
  }

  async function approve(id: number) {
    await supabase
      .from("reviews")
      .update({
        aprobada: true,
      })
      .eq("id", id);

    loadReviews();
  }

  async function remove(id: number) {
    await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    loadReviews();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-[#D4AF37] mb-10">
        RESEÑAS
      </h1>

      <div className="grid gap-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-[#120000] border border-red-900 rounded-xl p-6"
          >
            <h3 className="font-bold text-xl">
              {review.nombre}
            </h3>

            <p className="text-yellow-400 mt-2">
              {"⭐".repeat(review.estrellas)}
            </p>

            <p className="mt-3">
              {review.comentario}
            </p>

            <div className="flex gap-3 mt-4">

              {!review.aprobada && (
                <button
                  onClick={() =>
                    approve(review.id)
                  }
                  className="bg-green-700 px-4 py-2 rounded"
                >
                  Aprobar
                </button>
              )}

              <button
                onClick={() =>
                  remove(review.id)
                }
                className="bg-red-700 px-4 py-2 rounded"
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