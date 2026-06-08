export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-sm border-b border-red-900 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
          CHINO BARBER
        </h1>

        <div className="flex gap-6 text-white font-semibold">
          <a
            href="#servicios"
            className="hover:text-[#D4AF37] transition"
          >
            Servicios
          </a>

          <a
            href="#horarios"
            className="hover:text-[#D4AF37] transition"
          >
            Horarios
          </a>

          <a
            href="#reserva"
            className="hover:text-[#D4AF37] transition"
          >
            Reservar
          </a>
        </div>

      </div>
    </nav>
  );
}