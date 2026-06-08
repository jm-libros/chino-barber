"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Review {
  id: number;
  nombre: string;
  comentario: string;
  estrellas: number;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("aprobada", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setReviews(data || []);

    if (data && data.length > 0) {
      const total = data.reduce(
        (sum, review) => sum + review.estrellas,
        0
      );

      setAverage(total / data.length);
    }
  }

  return (
    <section
      id="testimonios"
      className="bg-black py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-[#D4AF37] mb-4">
          RESEÑAS DE CLIENTES
        </h2>

        <p className="text-center text-gray-400 mb-12">
          ⭐ {average.toFixed(1)} / 5 · Basado en {reviews.length} reseñas
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                bg-[#120000]
                border
                border-red-900
                rounded-2xl
                p-6
              "
            >
              <div className="text-yellow-400 text-xl mb-3">
                {"⭐".repeat(review.estrellas)}
              </div>

              <p className="text-gray-300 mb-4">
                "{review.comentario}"
              </p>

              <p className="font-bold text-white">
                — {review.nombre}
              </p>
            </div>
          ))}

        </div>

        {reviews.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Aún no hay reseñas disponibles.
          </p>
        )}

      </div>
    </section>
  );
}