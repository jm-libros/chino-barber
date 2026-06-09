export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900 py-10">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-[#D4AF37]">
          CHINO BARBER
        </h2>

        <p className="mt-4 text-gray-400">
          Barbería Premium a Domicilio
        </p>

        <p className="mt-2 text-gray-400">
          Corte: $10.000
        </p>

        <p className="text-gray-400">
          Barba: $3.000
        </p>

        <p className="text-gray-400">
          Cejas: $1.000
        </p>

        <a
          href="https://wa.me/56940559447"
          target="_blank"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
        >
          WhatsApp
        </a>

        <p className="mt-8 text-sm text-gray-500">
          © 2026 Chino Barber
        </p>

      </div>

      <div className="mt-6 text-center">
  <a
    href="https://www.instagram.com/chino_barber.oficial"
    target="_blank"
    className="text-[#D4AF37] font-bold hover:underline"
  >
    📸 @chino_barber
  </a>
</div>
    </footer>
  );
}