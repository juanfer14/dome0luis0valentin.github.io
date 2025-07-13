'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/home/Header'

export default function RegisterPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // lógica de registro opcional aquí
    router.push('/menu') // redirigir al menú luego del registro
  }

  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-12">


      <div className="rounded-lg shadow-md max-w-md bg-white w-full mx-4">
        <section id="register-section">
          <div className="px-4 py-6">
            <h2 className="text-center text-xl font-semibold mb-6">REGISTRARSE</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <label className="p-2 block">
                Nombre de Usuario
                <input
                  type="text"
                  placeholder="John Doe"
                  aria-label="Nombre de usuario"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  required
                />
              </label>
              <label className="p-2 block">
                Email
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  aria-label="Email"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  required
                />
              </label>
              <label className="p-2 block">
                Contraseña
                <input
                  type="password"
                  placeholder="••••••"
                  aria-label="Contraseña"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                  required
                />
              </label>
              <div className="py-2">
                <button
                  type="submit"
                  className="bg-gray-800 text-white w-full px-6 py-2 rounded"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-sm">
              ¿Ya tenés cuenta?
              <button
                className="text-blue-600 ml-1 underline"
                onClick={() => router.push('/')}
              >
                Ingresar
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
