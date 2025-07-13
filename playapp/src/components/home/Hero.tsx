// /src/components/home/Hero.tsx

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 " style={{ color: "black" }}>
            
            Encontrá la mejor playa para vos y tu familia
          </h1>
          <p className="mb-6 text-gray-600">
            ¿Alguna vez te preguntaste qué tan segura, higiénica, bonita o tranquila es la playa a la que querés ir?
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="https://infogei.com/uploads/noticias/2/2023/01/20230107182009_rio.jpg"
            alt="Playa destacada"
            width={600} // puedes ajustar
            height={400} // puedes ajustar
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  )
}
