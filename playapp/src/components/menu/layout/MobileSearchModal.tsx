'use client'

export default function MobileSearchModal({ onClose }: { onClose: () => void }) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/60 z-50 sm:hidden flex items-center justify-center px-4"
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full bg-transparent text-sm focus:outline-none"
        />
        <button onClick={onClose} className="text-xl text-gray-600">✖</button>
      </div>
    </div>
  )
}
