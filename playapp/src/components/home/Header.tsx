// /src/components/home/Header.tsx

"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const goToRegister = () => {
    router.push("/registrar");
  };

  function scrollToLogin() {
    const loginSection = document.getElementById("login-section");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    } else
      router.push("/");
  }

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="option-header-container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="option-header items-center space-x-2 flex">
          <Image
            src="https://img.icons8.com/ios-filled/50/ffffff/beach.png"
            alt="Logo"
            width={24} // ancho en píxeles
            height={24} // alto en píxeles
            className="h-6" // o podés usar aquí para styling adicional
          />
          <span className="font-bold text-white text-xl">Playapp</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-white md:hidden">
          ☰
        </button>
        <nav className="option-header space-x-6 hidden md:flex">
          <a
            href="#"
            className="text-white hover:text-white focus:outline-none 
    px-4 py-2 flex justify-center items-center border border-transparent 
    hover:border-white focus:border-white rounded transition"
          >
            Ayuda
          </a>
          <a
            href="#"
            className="text-white hover:text-white focus:outline-none 
    px-4 py-2 flex justify-center items-center border border-transparent 
    hover:border-white focus:border-white rounded transition"
          >
            Conocé más
          </a>
          <button
            className="border px-6 py-2 rounded bg-white hover:text-gray-500"
            onClick={goToRegister}
          >
            Registrame
          </button>
          <button
            className="border px-6 py-2 rounded bg-white hover:text-gray-500"
            onClick={scrollToLogin}
          >
            Logearme
          </button>
        </nav>
      </div>

      {open && (
        <nav className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2 text-white">
          <a
            href="#"
            className="block text-white px-4 py-2 text-center rounded border border-transparent 
    hover:border-white focus:border-white focus:outline-none transition"
          >
            Ayuda
          </a>
          <a
            href="#"
            className="block text-white px-4 py-2 text-center rounded border border-transparent 
    hover:border-white focus:border-white focus:outline-none transition"
          >
            Conocé más
          </a>
          <button
            className="w-full border px-4 py-2 rounded bg-white text-black text-gray-800 hover:bg-gray-100"
            onClick={scrollToLogin}
          >
            Registrame
          </button>
          <button
            className="w-full border px-4 py-2 rounded bg-white text-black text-gray-800 hover:bg-gray-100"
            onClick={scrollToLogin}
          >
            Logearme
          </button>
        </nav>
      )}
    </header>
  );
}
