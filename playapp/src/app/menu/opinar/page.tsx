// /src/app/menu/opinar/page.tsx

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { beachLocations, Beach } from "@/data/beaches";

import { useBeaches } from "@/app/context/BeachesContext";
import { Rating } from "@/data/beaches";
import { useRouter } from "next/navigation";

const COLORS: Record<number, string> = {
  1: "bg-red-600",
  2: "bg-orange-500",
  3: "bg-yellow-400",
  4: "bg-green-500",
};

const LABELS = [
  "Calidad de Arena",
  "Calidad del Agua",
  "Concurrencia",
  "Limpieza",
  "Tranquilidad",
  "Atracciones",
];

export default function OpinarPage() {
  const router = useRouter();

  const [values, setValues] = useState(
    LABELS.reduce((acc, label) => {
      acc[label] = 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const [opinion, setOpinion] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (label: string, val: number) => {
    setValues((prev) => ({ ...prev, [label]: val }));
  };

  const searchParams = useSearchParams();
  const playaId = searchParams.get("playa") || "";
  const beach: Beach = beachLocations[Number(playaId) - 1];

  const { addOpinion } = useBeaches();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Por favor, completa el captcha");
      return;
    }

    
  };

  // Estado para saber si ya se envió la opinión
  const [opinionEnviada, setOpinionEnviada] = useState(false);

  // Aquí guardarías el id o datos de la opinión para editar o eliminar
  const opinionId = 123; // ejemplo, cambia según tu lógica real

  const opinionLista = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí lógica de envío de opinión (fetch, axios, etc)
    // Si éxito:
    if (!captchaValue) {
      alert("Por favor, completa el captcha");
      return;
    }
    setOpinionEnviada(true);
  };

  const eliminarOpinion = () => {
    // Lógica para eliminar opinión por id (opinionId)
    alert("Opinión eliminada");
    router.push("/mapa"); // Volver al mapa tras eliminar
  };

  const editarOpinion = () => {
    // Ir a página de edición o mostrar formulario con datos
    alert("Editar opinión");
    setOpinionEnviada(false); // o redirigir a otra página
  };

  const volverAlMapa = () => {
    const newRating: Rating = {
      arena: values["Calidad de Arena"],
      agua: values["Calidad del Agua"],
      concurrencia: values["Concurrencia"],
      limpieza: values["Limpieza"],
      tranquilidad: values["Tranquilidad"],
      atracciones: values["Atracciones"],
    };

    const beachId = Number(playaId);

    addOpinion(beachId, newRating); // <-- 💥 actualiza el contexto

    alert("Opinión enviada. ¡Gracias!");

    router.push("/menu"); // 👈 volver al mapa automáticamente
    router.push("/mapa");
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans text-black">
      {/* Cabecera con nombre y botón de volver */}
      {!opinionEnviada &&
        (<>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{beach.name}</h2>
            <button
              onClick={() => router.push("/menu")}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded"
            >
              Volver al mapa
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-6">Ingrese su opinión</h3>

          <form onSubmit={opinionLista} className="space-y-8">
            {LABELS.map((label) => {
              const val = values[label];
              const colorClass = COLORS[val];
              const sliderPercent = ((val - 1) / 3) * 100;

              return (
                <div key={label} className="space-y-2 w-full">
                  <label className="block font-semibold">{label}</label>

                  {/* Emoji alineados con el slider */}
                  <div className="relative h-8 select-none mb-1">
                    <span
                      className="absolute top-0 text-2xl cursor-default"
                      style={{ left: "0.50%" }}
                    >
                      😞
                    </span>
                    <span
                      className="absolute top-0 text-2xl cursor-default"
                      style={{ left: "32.00%" }}
                    >
                      😐
                    </span>
                    <span
                      className="absolute top-0 text-2xl cursor-default"
                      style={{ left: "63.66%" }}
                    >
                      🙂
                    </span>
                    <span
                      className="absolute top-0 text-2xl cursor-default"
                      style={{ left: "99.80%", transform: "translateX(-100%)" }}
                    >
                      😀
                    </span>
                  </div>

                  {/* Slider container */}
                  <div className="relative w-full">
                    <div
                      className="absolute top-1/2 left-0 h-1 rounded-full bg-gray-300"
                      style={{ width: "100%", transform: "translateY(-50%)" }}
                    />
                    <div
                      className={`absolute top-1/2 left-0 h-1 rounded-full ${colorClass}`}
                      style={{
                        width: `${sliderPercent}%`,
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      type="range"
                      min={1}
                      max={4}
                      step={1}
                      value={val}
                      onChange={(e) =>
                        handleChange(label, Number(e.target.value))
                      }
                      className="w-full appearance-none bg-transparent relative z-10 cursor-pointer"
                      style={{ WebkitAppearance: "none" }}
                    />
                    <style jsx>{`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: ${colorClass.includes("red")
                          ? "#dc2626"
                          : colorClass.includes("orange")
                          ? "#f97316"
                          : colorClass.includes("yellow")
                          ? "#fcd34d"
                          : "#4ade80"};
                        border: 2px solid white;
                        cursor: pointer;
                        margin-top: -11px;
                        position: relative;
                        z-index: 20;
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: ${colorClass.includes("red")
                          ? "#dc2626"
                          : colorClass.includes("orange")
                          ? "#f97316"
                          : colorClass.includes("yellow")
                          ? "#fcd34d"
                          : "#4ade80"};
                        border: 2px solid white;
                        cursor: pointer;
                        position: relative;
                        z-index: 20;
                      }
                    `}</style>
                  </div>
                </div>
              );
            })}

            <div>
              <label htmlFor="opinion" className="block font-semibold mb-1">
                Comentarios
              </label>
              <textarea
                id="opinion"
                rows={4}
                className="w-full border border-gray-400 rounded-md p-2 resize-none"
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                placeholder="Ingrese su opinión aquí..."
                required
              />
            </div>

            <div>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // sitekey de test para desarrollo local
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-purple-950 text-white font-bold py-3 rounded transition"
            >
              Publicar
            </button>
          </form>
        </>
        )} : (
          <div>
            <div className="mb-6">
              {/* Icono */}
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Gracias por tu opinión
              </h2>
              <p className="text-gray-600 mb-8">Opinión Publicada</p>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={eliminarOpinion}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Eliminar <br /> Opinión
              </button>
              <button
                onClick={editarOpinion}
                className="flex-1 bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
              >
                Editar <br /> Opinión
              </button>
            </div>

            <button
              onClick={volverAlMapa}
              className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800"
            >
              Volver al Mapa
            </button>
          </div>
        )
    </div>
  );
}
