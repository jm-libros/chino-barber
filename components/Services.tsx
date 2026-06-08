export default function Services() {
  const services = [
    {
      name: "Corte de Pelo",
      price: "$10.000",
      description: "Todo tipo de cortes a domicilio."
    },
    {
      name: "Barba",
      price: "$3.000",
      description: "Perfilado y arreglo de barba."
    },
    {
      name: "Cejas",
      price: "$1.000",
      description: "Perfilado profesional de cejas."
    }
  ];

  return (
    <section
      id="servicios"
      className="bg-[#120000] py-20 px-6"
    >
      <h2 className="text-center text-5xl font-bold text-[#D4AF37] mb-14">
        SERVICIOS
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-black border border-red-900 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
              {service.name}
            </h3>

            <p className="text-3xl font-bold text-red-600 mb-4">
              {service.price}
            </p>

            <p className="text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}