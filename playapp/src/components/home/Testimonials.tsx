import Image from "next/image"

export default function Testimonials() {
  const testimonios = [
    {
      nombre: "Esteban Trabajos",
      username: "@et_manzanas99",
      mensaje: "Sin lugar a dudas la playa de Punta Lara es la mejor a la que mi familia y yo hemos ido!!!",
      hora: "8:21 PM / Dec 21, 2022",
      foto: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      nombre: "Billy Puertas",
      username: "@bpuertas",
      mensaje: "He estado recorriendo muchas de las playas del Río de la Plata en este último mes, y he notado que es mucho más tranquilo ir los días de semana.",
      hora: "8:21 PM / Dec 21, 2022",
      foto: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      nombre: "Armando Paredes",
      username: "@paredes_real",
      mensaje: "Hace años que voy a la misma playa, todos los veranos, sin dudas Punta Indio es la mejor.",
      hora: "8:21 PM / Dec 21, 2022",
      foto: "https://randomuser.me/api/portraits/men/60.jpg"
    }
  ]

  return (
    <section className="py-12 px-4 bg-gray-100" role="main" aria-label="testimonios">
      <h2 className="text-center text-xl font-semibold mb-8">Algunas opiniones</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonios.map((t, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow text-sm border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={t.foto}
                alt={t.nombre}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{t.nombre}</span>
                  <Image
                    src="https://img.icons8.com/ios-filled/16/777777/verified-account--v1.png"
                    alt="Verificado"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-gray-500 text-xs">{t.username}</span>
              </div>
            </div>
            <p className="text-gray-800 mb-3">{t.mensaje}</p>
            <div className="text-gray-500 text-xs">{t.hora}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
