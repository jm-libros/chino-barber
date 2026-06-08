import Image from "next/image";

export default function Gallery() {
  const images = [
    "/cortes/fade.jpg",
    "/cortes/taper.jpg",
    "/cortes/mullet.jpg",
    "/cortes/buzz.jpg",
    "/cortes/clasico.jpg",
  ];

  return (
    <section className="py-20 bg-black">
      <h2 className="text-center text-5xl font-bold text-[#D4AF37] mb-10">
        CORTES DE PELO
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        {images.map((img) => (
          <div key={img} className="overflow-hidden rounded-xl">
            <Image
              src={img}
              alt="Corte realizado"
              width={500}
              height={500}
              className="w-full h-80 object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </section>
  );
}