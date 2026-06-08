"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(false);
    loadBookings();
  }

  async function loadBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    setBookings(data || []);
  }

  async function deleteBooking(id: number) {
    const confirmDelete = confirm(
      "¿Eliminar esta reserva?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    loadBookings();
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    await supabase
      .from("bookings")
      .update({
        estado: status,
      })
      .eq("id", id);

    loadBookings();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const filtered = bookings.filter((booking) =>
    booking.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalRevenue = filtered.reduce(
    (sum, booking) => sum + (booking.total || 0),
    0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Cargando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-[#D4AF37]">
          PANEL ADMIN CHINO BARBER
        </h1>

        <button
          onClick={logout}
          className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-bold"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#120000] p-6 rounded-xl border border-red-900">
          <h3 className="text-xl">Reservas</h3>
          <p className="text-4xl font-bold">
            {filtered.length}
          </p>
        </div>

        <div className="bg-[#120000] p-6 rounded-xl border border-red-900">
          <h3 className="text-xl">
            Ingresos estimados
          </h3>
          <p className="text-4xl font-bold text-[#D4AF37]">
            ${totalRevenue.toLocaleString("es-CL")}
          </p>
        </div>

        <div className="bg-[#120000] p-6 rounded-xl border border-red-900">
          <input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-3 rounded bg-black border border-red-900"
          />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-red-900">
          <thead className="bg-[#8B0000]">
            <tr>
              <th className="p-3">Cliente</th>
              <th className="p-3">Comuna</th>
              <th className="p-3">Corte</th>
              <th className="p-3">Día</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Total</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((booking) => (
              <tr
                key={booking.id}
                className="border-t border-red-900"
              >
                <td className="p-3">
                  {booking.nombre}
                </td>

                <td className="p-3">
                  {booking.comuna}
                </td>

                <td className="p-3">
                  {booking.corte}
                </td>

                <td className="p-3">
                  {booking.dia}
                </td>

                <td className="p-3">
                  {booking.hora}
                </td>

                <td className="p-3">
                  {booking.estado || "Pendiente"}
                </td>

                <td className="p-3">
                  $
                  {booking.total?.toLocaleString(
                    "es-CL"
                  )}
                </td>

                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "Completado"
                      )
                    }
                    className="bg-green-700 px-3 py-1 rounded"
                  >
                    ✓
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "Cancelado"
                      )
                    }
                    className="bg-yellow-700 px-3 py-1 rounded"
                  >
                    !
                  </button>

                  <button
                    onClick={() =>
                      deleteBooking(booking.id)
                    }
                    className="bg-red-700 px-3 py-1 rounded"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}