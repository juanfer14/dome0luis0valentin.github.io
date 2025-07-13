import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white py-6 border-t-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex space-x-4 items-center">
          <span className="text-sm font-medium">Follow us</span>
          <a href="#" aria-label="Link a página de Facebook de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/facebook.png"
              alt="Logo de Facebook"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a perfil de Instagram de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/instagram-new.png"
              alt="Logo de Instagram"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a perfil de red social X de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/x.png"
              alt="Link de red social X"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a canal de Youtube de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/youtube-play.png"
              alt="Link de Youtube"
              width={20}
              height={20}
            />
          </a>
        </div>

        <div className="mt-4 md:mt-0">
          <label className="text-sm font-medium">
            Inscribite a nuestra Newsletter:
            <div className="flex mt-1">
              <input
                type="email"
                placeholder="Tu mail"
                className="border border-gray-300 px-2 py-1 rounded-l text-sm"
              />
              <button className="bg-gray-800 text-white px-3 rounded-r text-sm">
                SUSCRIBIRME
              </button>
            </div>
          </label>
        </div>
      </div>
      <p className="text-center text-gray-800 text-xs mt-4">
        © 2025 Playapp. Todos los derechos reservados.
      </p>
    </footer>
  )
}
