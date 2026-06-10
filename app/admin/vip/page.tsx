"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function VipPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    const grouped: any = {};

    data?.forEach((booking) => {
      const name = booking.nombre;

      if (!name) return;

      if (!grouped[name]) {
        grouped[name] = {
          nombre: name,
          visitas: 0,
          gastado: 0,
          ultimaVisita: booking.created_at,
        };
      }

      grouped[name].visitas += 1;
      grouped[name].gastado += booking.total || 0;

      if (
        new Date(booking.created_at) >
        new Date(grouped[name].ultimaVisita)
      ) {
        grouped[name].ultimaVisita =
          booking.created_at;
      }
    });

    const ranking = Object.values(grouped)
      .sort(
        (a: any, b: any) =>
          b.visitas - a.visitas
      );

    setClients(ranking);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Cargando clientes VIP...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-[#D4AF37] mb-10">
        👑 CLIENTES VIP
      </h1>

      <div className="grid gap-5">

        {clients.map((client, index) => {

          let nivel = "Cliente";

          if (client.visitas >= 20) {
            nivel = "VIP DIAMANTE 💎";
          } else if (client.visitas >= 10) {
            nivel = "VIP GOLD 👑";
          } else if (client.visitas >= 5) {
            nivel = "VIP SILVER 🥈";
          }

          return (

            <div
              key={client.nombre}
              className="
                bg-[#120000]
                border
                border-red-900
                rounded-xl
                p-6
              "
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-3xl font-bold">

                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}

                  {client.nombre}

                </h2>

                <span className="text-[#D4AF37] font-bold text-xl">
                  #{index + 1}
                </span>

              </div>

              <div className="grid md:grid-cols-4 gap-4">

                <div>
                  <p className="text-gray-400">
                    Visitas
                  </p>

                  <p className="text-2xl font-bold">
                    {client.visitas}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Gastado
                  </p>

                  <p className="text-2xl font-bold text-green-400">
                    $
                    {client.gastado.toLocaleString(
                      "es-CL"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Nivel
                  </p>

                  <p className="text-xl font-bold">
                    {nivel}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Última visita
                  </p>

                  <p className="font-bold">
                    {new Date(
                      client.ultimaVisita
                    ).toLocaleDateString(
                      "es-CL"
                    )}
                  </p>
                </div>

              </div>

            </div>

          );
        })}

      </div>

    </main>
  );
}