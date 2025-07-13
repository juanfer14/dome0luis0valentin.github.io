import Image from "next/image"

const beachImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfiR2ya7m-Se19ZqHxhP5EORNzw3tR6IKqw&s",
    alt: "Varias personas nadando en el río en un día soleado",
  },
  {
    src: "https://www.clarin.com/img/2018/11/07/GTFKkcrYC_1256x620__1.jpg",
    alt: "Paisaje de la playa vacía",
  },
  {
    src: "https://www.clarin.com/img/2016/08/16/r1lQG3MRXl_720x0.jpg",
    alt: "Camino al lado del río, con árboles a un costado, que dan sombra",
  },
  {
    src: "https://www.cronica.com.ar/img/2023/01/07/punta_indio-argentinaturismo_com_ar_crop1673108242203.jpg?__scale=w:1200,h:900,t:2,fpx:821,fpy:575",
    alt: "Árbol a la orilla de una playa",
  },
  {
    src: "https://www.baenegocios.com/img/2023/10/26/buenosairesplaya-escapada.jpg?__scale=c:transparent,w:745,h:419,t:3",
    alt: "Río a la izquierda, separado por una baranda de seguridad, un camino y tiendas",
  },
  {
    src: "https://conocer365.uy/wp-content/uploads/2019/01/kiy%C3%BA-barranca-intensify.jpg",
    alt: "Imagén de la arena de la playa",
  },
]

export default function TopBeaches() {
  return (
    <section className="py-10 bg-gray-100" role="main" aria-label="Carrusel de imágenes de playas del Río de la Plata">
      <h2 className="text-center text-xl font-semibold mb-6">
        Conocé cuáles son las mejores playas del Río de la Plata
      </h2>
      <div className="flex justify-center gap-3 overflow-x-auto px-4">
        {beachImages.map((image, idx) => (
          <div key={idx} className="relative min-w-[300px] h-[200px] rounded shadow-sm" tabIndex={0}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-sm mt-4 text-gray-600">Tu opinión también cuenta</p>
    </section>
  )
}
