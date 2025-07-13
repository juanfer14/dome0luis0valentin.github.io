'use client'

import { useState } from 'react'

export default function DropdownFilter() {
  const options = [
    '🏖️ CONTAMINACIÓN EN LA ARENA',
    '🌊 CONTAMINACIÓN DEL AGUA',
    '🧹 LIMPIEZA',
    '🧘‍♀️ TRANQUILIDAD',
    '🎡 ATRACCIONES',
  ]

  const [selectedOptions, setSelectedOptions] = useState<number[]>(options.map((_, i) => i))
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        if (prev.length === 1) return prev // evitar dejar cero opciones seleccionadas
        return prev.filter((i) => i !== index)
      }
      return [...prev, index]
    })
  }

  return (
    <div className="absolute top-6 right-6 z-50 w-64">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg flex items-center justify-between hover:bg-opacity-90"
      >
        ⚙️ PUNTUAR POR
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Opciones (si está abierto) */}
      {isOpen && (
        <div className="mt-2 w-full bg-black bg-opacity-80 text-white rounded-lg p-2 space-y-1">
          {options.map((label, i) => {
            const isSelected = selectedOptions.includes(i)
            return (
              <button
                key={i}
                onClick={() => toggleOption(i)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded ${
                  isSelected ? 'bg-gray-900' : 'bg-transparent'
                } hover:bg-gray-800`}
              >
                <span>{label}</span>
                {isSelected && <span>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
