'use client'

import Image from 'next/image'

interface TopbarProps {
  onToggleSidebar: () => void
  onToggleSearch: () => void
}

export default function Topbar({ onToggleSidebar, onToggleSearch }: TopbarProps) {
  return (
    <header className="flex items-center justify-between bg-white text-black px-4 py-3 shadow gap-3">
      <button
        id="menuToggle"
        className="md:hidden text-2xl mr-4"
        onClick={onToggleSidebar} // <--- IMPORTANTE
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <h1 className="text-xl font-semibold hidden md:block">Bienvenido John</h1>
      <div className="flex items-center gap-3 overflow-hidden flex-shrink-0">
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Buscar"
            className="w-48 md:w-64 lg:w-72 px-4 py-1.5 rounded-full bg-gray-100 text-sm focus:outline-none"
          />
        </div>
        <button id="mobileSearchToggle" className="sm:hidden text-xl" onClick={onToggleSearch} aria-label="Toggle search">
          🔍
        </button>
        <span className="relative flex-shrink-0">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">4</span>
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            width={32}
            height={32}
            alt="User"
            className="rounded-full"
          />
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </header>
  )
}
