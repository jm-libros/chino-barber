export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center px-6 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.85), rgba(40,0,0,.90)), url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>

        <h1 className="text-6xl md:text-8xl font-extrabold text-[#D4AF37] tracking-widest">
        M IMPERIO BARBER
        </h1>

        <div className="w-40 h-1 bg-[#B22222] mx-auto my-8 rounded-full"></div>

        <p className="text-xl md:text-3xl text-white font-semibold">
          Barbería Premium a Domicilio
        </p>

        <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Cortes modernos, fades, barba y cejas directamente
          en tu hogar con atención personalizada.
        </p>

        <div className="mt-10 text-5xl md:text-7xl font-bold text-[#D4AF37]">
          Desde $10.000
        </div>

        <a
          href="#reserva"
          className="inline-block mt-10 bg-[#8B0000] hover:bg-[#B22222]
          px-10 py-4 rounded-xl text-xl font-bold text-white
          transition-all duration-300 hover:scale-105"
        >
          RESERVAR AHORA
        </a>

      </div>
    </section>
  );
}