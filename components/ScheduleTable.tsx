export default function ScheduleTable() {
  const schedule = [
    ["Lunes", "16:00 - 19:00"],
    ["Martes", "18:00 - 20:00"],
    ["Miércoles", "18:00 - 20:00"],
    ["Jueves", "16:00 - 19:00"],
    ["Viernes", "14:00 - 20:00"],
    ["Sábado", "14:00 - 20:00"],
    ["Domingo", "14:00 - 20:00"],
  ];

  return (
    <section
      id="horarios"
      className="bg-black py-20 px-6"
    >
      <h2 className="text-center text-5xl font-bold text-[#D4AF37] mb-14">
        HORARIOS DISPONIBLES
      </h2>

      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-red-900 shadow-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-[#8B0000]">
              <th className="p-4 text-left">Día</th>
              <th className="p-4 text-left">Horario</th>
            </tr>
          </thead>

          <tbody>
            {schedule.map(([day, hours]) => (
              <tr
                key={day}
                className="border-t border-red-950 hover:bg-[#120000]"
              >
                <td className="p-4 font-semibold">{day}</td>
                <td className="p-4">{hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}