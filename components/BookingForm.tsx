"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { cuts } from "../data/cuts";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [comuna, setComuna] = useState("Talagante");
  const [sector, setSector] = useState("");

  const [cut, setCut] = useState(cuts[0]);

  const [beard, setBeard] = useState(false);
  const [eyebrows, setEyebrows] = useState(false);

  const [day, setDay] = useState("Lunes");
  const [hour, setHour] = useState("");

  const [payment, setPayment] = useState("Efectivo");

  const [occupiedHours, setOccupiedHours] = useState<string[]>([]);

  const availableHours: Record<string, string[]> = {
    Lunes: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Martes: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Miércoles: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Jueves: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Viernes: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Sábado: ["11:30", "12:30", "13:30", "14:30", "17:30"],
    Domingo: ["11:30", "12:30", "13:30", "14:30", "17:30"],
  };

  useEffect(() => {
    loadOccupiedHours();
  }, [day]);

  async function loadOccupiedHours() {
    const { data } = await supabase
      .from("bookings")
      .select("hora")
      .eq("dia", day);

    const occupied =
      data?.map((item) => item.hora) || [];

    setOccupiedHours(occupied);
  }

  const freeHours =
    availableHours[day].filter(
      (time) => !occupiedHours.includes(time)
    );

  useEffect(() => {
    if (freeHours.length > 0) {
      setHour(freeHours[0]);
    } else {
      setHour("");
    }
  }, [day, occupiedHours]);

  const total = useMemo(() => {
    let price = 10000;

    if (beard) price += 3000;
    if (eyebrows) price += 1000;

    return price;
  }, [beard, eyebrows]);

  async function sendWhatsApp() {
    if (!name.trim()) {
      alert("Ingresa tu nombre");
      return;
    }

    if (!age.trim()) {
      alert("Ingresa tu edad");
      return;
    }

    if (!sector.trim()) {
      alert("Ingresa tu sector o referencia");
      return;
    }

    if (!hour) {
      alert(
        "No quedan horarios disponibles para este día"
      );
      return;
    }

    const { data: existingBooking } = await supabase
      .from("bookings")
      .select("id")
      .eq("dia", day)
      .eq("hora", hour)
      .maybeSingle();

    if (existingBooking) {
      alert(
        "Esta hora ya fue reservada. Selecciona otra."
      );

      loadOccupiedHours();
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          nombre: name,
          edad: Number(age),

          comuna,
          sector,

          corte: cut,

          barba: beard,
          cejas: eyebrows,

          dia: day,
          hora: hour,

          pago: payment,

          total,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Error al guardar la reserva");
      return;
    }

    const message = `💈 RESERVA CHINO BARBER 💈

👤 Nombre: ${name}
🎂 Edad: ${age}

📍 Comuna: ${comuna}
🏠 Sector: ${sector}

✂️ Corte: ${cut}
🪒 Barba: ${beard ? "Sí" : "No"}
👁️ Cejas: ${eyebrows ? "Sí" : "No"}

📅 Día: ${day}
🕒 Hora: ${hour}

💳 Método de Pago: ${payment}

💰 Total: $${total.toLocaleString("es-CL")}

Quiero confirmar esta reserva.`;

    window.open(
      `https://wa.me/56940559447?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    alert("Reserva guardada correctamente");

    setName("");
    setAge("");
    setSector("");

    loadOccupiedHours();
  }

  return (
    <section
      id="reserva"
      className="bg-[#120000] py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-5xl text-center font-bold text-[#D4AF37] mb-12">
          RESERVA TU HORA
        </h2>

        <div className="bg-black border border-red-900 rounded-2xl p-8 grid gap-5">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          />

          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          />

          <select
            value={comuna}
            onChange={(e) =>
              setComuna(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          >
            <option>Talagante</option>
            <option>Peñaflor</option>
            <option>El Monte</option>
            <option>Isla de Maipo</option>
            <option>Padre Hurtado</option>
            <option>Maipú</option>
            <option>Otra</option>
          </select>

          <input
            type="text"
            placeholder="Sector o referencia"
            value={sector}
            onChange={(e) =>
              setSector(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          />

          <select
            value={cut}
            onChange={(e) =>
              setCut(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          >
            {cuts.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-6">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={beard}
                onChange={(e) =>
                  setBeard(e.target.checked)
                }
              />
              Barba (+$3.000)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={eyebrows}
                onChange={(e) =>
                  setEyebrows(e.target.checked)
                }
              />
              Cejas (+$1.000)
            </label>

          </div>

          <select
            value={day}
            onChange={(e) =>
              setDay(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          >
            {Object.keys(
              availableHours
            ).map((dayName) => (
              <option key={dayName}>
                {dayName}
              </option>
            ))}
          </select>

          <select
            value={hour}
            onChange={(e) =>
              setHour(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          >
            {freeHours.map((time) => (
              <option key={time}>
                {time}
              </option>
            ))}
          </select>

          <select
            value={payment}
            onChange={(e) =>
              setPayment(e.target.value)
            }
            className="p-4 rounded-lg bg-[#1a1a1a] border border-red-900"
          >
            <option>Efectivo</option>
            <option>Transferencia</option>
          </select>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Total a pagar
            </p>

            <h3 className="text-5xl font-bold text-[#D4AF37] mt-2">
              $
              {total.toLocaleString("es-CL")}
            </h3>
          </div>

          <button
            onClick={sendWhatsApp}
            className="
              bg-[#8B0000]
              hover:bg-[#B22222]
              transition
              p-4
              rounded-xl
              font-bold
              text-xl
            "
          >
            RESERVAR POR WHATSAPP
          </button>

        </div>
      </div>
    </section>
  );
}