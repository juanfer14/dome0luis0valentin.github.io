"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { beachLocations, Beach, UserRating } from "@/data/beaches";

import { useBeaches } from "@/app/context/BeachesContext";
import { Rating } from "@/data/beaches";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";

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

export default function OpinarClient() {
  const { darkMode } = useTheme();

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

  const { beachRatings, addOpinion, editOpinion, deleteOpinion } = useBeaches();

  const userId = 101; // ⚠️ reemplazar luego por sistema de login real
  const [captchaError, setCaptchaError] = useState(false);
  const [opinionEliminada, setOpinionEliminada] = useState(false);

  // Estado para saber si ya se envió la opinión
  const [opinionEnviada, setOpinionEnviada] = useState(false);
  const [currentOpinion, setCurrentOpinion] = useState<UserRating | null>(null);
  const opinionesDeLaPlaya = beachRatings[Number(playaId)] ?? [];
  const opinionExistente = opinionesDeLaPlaya.find(
    (op) => op.userId === userId
  );

  useEffect(() => {
    setOpinionEnviada(false);
  }, [playaId]);

  useEffect(() => {
    if (opinionExistente) {
      const nuevaOpinion = opinionExistente.rating;
      setValues({
        "Calidad de Arena": nuevaOpinion.arena,
        "Calidad del Agua": nuevaOpinion.agua,
        Concurrencia: nuevaOpinion.concurrencia,
        Limpieza: nuevaOpinion.limpieza,
        Tranquilidad: nuevaOpinion.tranquilidad,
        Atracciones: nuevaOpinion.atracciones,
      });
      setOpinion(opinionExistente.comentario);
      setCurrentOpinion(opinionExistente); // <--- guardar opinión
    }
  }, [opinionExistente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();

    if (!captchaValue) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    const newRating: Rating = {
      arena: values["Calidad de Arena"],
      agua: values["Calidad del Agua"],
      concurrencia: values["Concurrencia"],
      limpieza: values["Limpieza"],
      tranquilidad: values["Tranquilidad"],
      atracciones: values["Atracciones"],
    };

    const fecha = new Date().toISOString().split("T")[0];
    const beachId = Number(playaId);

    const opinionExistente = opinionesDeLaPlaya.find(
      (op) => op.userId === userId && op.fecha === fecha
    );

    if (opinionExistente) {
      const updatedOpinion: UserRating = {
        ...opinionExistente,
        comentario: opinion,
        rating: newRating,
      };
      editOpinion(beachId, updatedOpinion);
      setCurrentOpinion(updatedOpinion); // <--- actualizar estado
    } else {
      const nuevaOpinion: UserRating = {
        id: Date.now(),
        userId,
        fecha,
        comentario: opinion,
        rating: newRating,
      };
      addOpinion(beachId, nuevaOpinion);
      setCurrentOpinion(nuevaOpinion); // <--- guardar
    }
    setOpinionEnviada(true);
  };

  const editarOpinion = () => {
    setCaptchaValue(null);
    setOpinionEnviada(false);
  };

  const eliminarOpinion = () => {
    if (!currentOpinion) {
      alert("No hay opinión para eliminar");
      return;
    }
    const beachId = Number(playaId);
    deleteOpinion(beachId, currentOpinion.id);
    setOpinionEliminada(true);
  };

  const volverAlMapa = () => {
    router.push("/menu"); // 👈 volver al mapa automáticamente
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans transition-colors duration-300">
      {/* Cabecera con nombre y botón de volver */}
      {!opinionEnviada && !opinionEliminada ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {beach.name}
            </h2>
            <button
              onClick={() => router.push("/menu")}
              className={`text-md font-semibold py-1 px-3 rounded
                ${
                  darkMode
                    ? "bg-gray-600  hover:bg-gray-700"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
            >
              Volver al mapa
            </button>
          </div>

          <h3
            className={`text-xl font-semibold mb-6 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Ingrese su opinión
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            {LABELS.map((label) => {
              const val = values[label];
              const colorClass = COLORS[val];
              const sliderPercent = ((val - 1) / 3) * 100;

              return (
                <div key={label} className="space-y-2 w-full">
                  <label className="block font-normal">{label}</label>

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
              <label
                htmlFor="opinion"
                className={`block font-semibold mb-1 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
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

            <div className="w-full flex flex-col items-center">
              <div className="transform origin-top scale-100 sm:scale-100 md:scale-100 lg:scale-100 w-max">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>

              {captchaError && (
                <p className={`${darkMode ? "text-yellow-400" : "text-red-500"} font-bold text-sm mt-2 text-center`}>
                  Por favor, completá el captcha.
                </p>
              )}
            </div>

            {opinionExistente ? (
              <>
                <div className="mb-4 text-sm">
                  Enviada el:{" "}
                  <span className="font-semibold">
                    {new Date(opinionExistente.fecha).toLocaleDateString(
                      "es-AR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={eliminarOpinion}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                  >
                    Eliminar <br /> Opinión
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!captchaValue) {
                        setCaptchaError(true);
                        return;
                      }
                      setCaptchaError(false);
                      handleSubmit(e);
                    }}
                    className={`flex-1 py-2 rounded  
                      ${
                        darkMode
                          ? "bg-gray-600  hover:bg-gray-700 text-white"
                          : "bg-black hover:bg-gray-700 text-white"
                      }`}
                  >
                    Aceptar <br />
                  </button>
                </div>
              </>
            ) : (
              <button
                type="submit"
                className={`w-full font-bold py-3 rounded transition
                  ${
                    darkMode
                      ? "bg-gray-100  hover:bg-gray-300 text-black"
                      : "bg-black hover:bg-gray-700 text-white"
                  }`}
              >
                Publicar
              </button>
            )}
          </form>
        </>
      ) : opinionEliminada ? (
        <div className="text-center">
          <div
            className={`mx-auto mb-4 w-24 h-24 rounded-full flex items-center justify-center ${
              darkMode ? "bg-gray-100" : "bg-gray-900"
            }`}
          >
            <span
              className={`text-3xl font-bold ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              🗑️
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Opinión eliminada</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
            Tu opinión fue eliminada correctamente.
          </p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => {
                setOpinion("");
                setOpinionEliminada(false);
                setOpinionEnviada(false);
                setCaptchaValue(null);
              }}
              className={`flex-1 py-2 rounded  
          ${
            darkMode
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-black hover:bg-gray-700 text-white"
          }`}
            >
              Publicar nueva opinión
            </button>
            <button
              onClick={volverAlMapa}
              className={`flex-1 py-2 rounded 
          ${
            darkMode
              ? "bg-gray-200 hover:bg-gray-300 text-black"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
            >
              Volver al mapa
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            {/* Icono */}
            <div
              className={`mx-auto mb-4 w-24 h-24 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-100" : "bg-gray-900"
              } `}
            >
              <span
                className={` text-3xl font-bold ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                ✓
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Gracias por tu opinión</h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} `}>
              Opinión Publicada
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={eliminarOpinion}
              className="flex-1  py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar <br /> Opinión
            </button>
            <button
              onClick={editarOpinion}
              className={`flex-1 py-2 rounded  
                ${
                  darkMode
                    ? "bg-gray-600  hover:bg-gray-700 text-white"
                    : "bg-black hover:bg-gray-700 text-white"
                }`}
            >
              Editar <br /> Opinión
            </button>
          </div>

          <button
            onClick={volverAlMapa}
            className={`w-full py-3 rounded 
              ${
                darkMode
                  ? "bg-gray-100  hover:bg-gray-300 text-black"
                  : "bg-black hover:bg-gray-700 text-white"
              } `}
          >
            Volver al Mapa
          </button>
        </div>
      )}
    </div>
  );
}
