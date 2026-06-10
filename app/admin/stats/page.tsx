"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function StatsPage() {
const [stats, setStats] = useState({
reservas: 0,
ingresos: 0,
clientes: 0,
corteTop: "Sin datos",
comunaTop: "Sin datos",
promedioCliente: 0,
ticketPromedio: 0,
ultimaReserva: "Sin datos",
topClientes: [] as any[],
});

useEffect(() => {
loadStats();
}, []);

async function loadStats() {
const { data, error } = await supabase
.from("bookings")
.select("*");


if (error) {
  console.error(error);
  return;
}

const reservas = data?.length || 0;

const ingresos =
  data?.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  ) || 0;

const clientes = new Set(
  data?.map((item) => item.nombre)
).size;

const cortes: Record<string, number> = {};

data?.forEach((item) => {
  cortes[item.corte] =
    (cortes[item.corte] || 0) + 1;
});

const corteTop =
  Object.entries(cortes).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "Sin datos";

const comunas: Record<string, number> = {};

data?.forEach((item) => {
  comunas[item.comuna] =
    (comunas[item.comuna] || 0) + 1;
});

const comunaTop =
  Object.entries(comunas).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "Sin datos";

const promedioCliente =
  clientes > 0
    ? ingresos / clientes
    : 0;

const ticketPromedio =
  reservas > 0
    ? ingresos / reservas
    : 0;

const ultimaReserva =
  data && data.length > 0
    ? data[data.length - 1].nombre
    : "Sin datos";

const clientesMap: any = {};

data?.forEach((item) => {
  if (!clientesMap[item.nombre]) {
    clientesMap[item.nombre] = {
      nombre: item.nombre,
      visitas: 0,
      gastado: 0,
    };
  }

  clientesMap[item.nombre].visitas += 1;
  clientesMap[item.nombre].gastado += item.total || 0;
});

const topClientes = Object.values(clientesMap)
  .sort(
    (a: any, b: any) =>
      b.gastado - a.gastado
  )
  .slice(0, 5);

setStats({
  reservas,
  ingresos,
  clientes,
  corteTop,
  comunaTop,
  promedioCliente,
  ticketPromedio,
  ultimaReserva,
  topClientes,
});


}

return ( <main className="min-h-screen bg-black text-white p-8">

  <h1 className="text-5xl font-bold text-[#D4AF37] mb-10">
    📈 ESTADÍSTICAS M IMPERIO BARBER
  </h1>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Reservas Totales</h2>
      <p className="text-5xl font-bold mt-2">
        {stats.reservas}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Ingresos Totales</h2>
      <p className="text-5xl font-bold text-green-400 mt-2">
        ${stats.ingresos.toLocaleString("es-CL")}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Clientes Únicos</h2>
      <p className="text-5xl font-bold mt-2">
        {stats.clientes}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Corte Más Solicitado</h2>
      <p className="text-3xl font-bold mt-2">
        ✂️ {stats.corteTop}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Comuna Más Frecuente</h2>
      <p className="text-3xl font-bold mt-2">
        📍 {stats.comunaTop}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Última Reserva</h2>
      <p className="text-3xl font-bold mt-2">
        👤 {stats.ultimaReserva}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Ticket Promedio</h2>
      <p className="text-3xl font-bold text-green-400 mt-2">
        ${stats.ticketPromedio.toLocaleString("es-CL", {
          maximumFractionDigits: 0,
        })}
      </p>
    </div>

    <div className="bg-[#120000] border border-red-900 rounded-xl p-6">
      <h2 className="text-gray-400">Promedio por Cliente</h2>
      <p className="text-3xl font-bold text-[#D4AF37] mt-2">
        ${stats.promedioCliente.toLocaleString("es-CL", {
          maximumFractionDigits: 0,
        })}
      </p>
    </div>

  </div>

  <div className="mt-12">

    <h2 className="text-4xl font-bold text-[#D4AF37] mb-6">
      🏆 TOP CLIENTES
    </h2>

    <div className="grid gap-4">

      {stats.topClientes.map(
        (cliente: any, index: number) => (
          <div
            key={cliente.nombre}
            className="
              bg-[#120000]
              border
              border-red-900
              rounded-xl
              p-5
            "
          >
            <div className="flex justify-between">

              <h3 className="text-2xl font-bold">

                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}

                {cliente.nombre}

              </h3>

              <span>
                #{index + 1}
              </span>

            </div>

            <p className="mt-2">
              📅 Visitas: {cliente.visitas}
            </p>

            <p>
              💰 Gastado: $
              {cliente.gastado.toLocaleString("es-CL")}
            </p>

          </div>
        )
      )}

    </div>

  </div>

</main>


);
}
