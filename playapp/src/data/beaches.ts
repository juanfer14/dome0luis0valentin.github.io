
// src/data/beaches.ts
export const beachLevelIconUrls = {
  nivel1: '/images/1.png',
  nivel2: '/images/2.png',
  nivel3: '/images/3.png',
  nivel4: '/images/4.png'
}

export const beachLevelScoreUrls = {
  nivel1: '/images/1-4.png',
  nivel2: '/images/2-4.png',
  nivel3: '/images/3-4.png',
  nivel4: '/images/4-4.png',
}

export const faceIcons = {
  veryHappy: '😀',
  happy: '🙂',
  neutral: '😐',
  annoyed: '🙁',
}

export type IconLevel = 'nivel1' | 'nivel2' | 'nivel3' | 'nivel4'


// Tipos

export type Rating = {
  arena: number;
  agua: number;
  concurrencia: number;
  limpieza: number;
  tranquilidad: number;
  atracciones: number;
};

export type UserRating = {
  id: number,
  userId: number,
  fecha: string,
  comentario: string
  rating: Rating
}


export type Beach = {
  id: number;
  coords: [number, number];
  name: string;
};

export type BeachScores = {
  arena: number;
  agua: number;
  concurrencia: number;
  limpieza: number;
  tranquilidad: number;
  atracciones: number;
  finalScore: number;
};

export type BeachWithScores = Beach & {
  scores: BeachScores | null;
};

// Datos

export const beachLocations: Beach[] = [
  { id: 1, coords: [-34.822267, -57.963088], name: 'Punta Lara' },
  { id: 2, coords: [-35.263109, -57.236898], name: 'Punta Indio' },
  { id: 3, coords: [-34.87, -57.83], name: 'Playa Mas o Menos' },
  { id: 4, coords: [-35.263109, -57.246898], name: 'Playa Bagliardi' },
  { id: 5, coords: [-34.854337, -57.840149], name: 'Palo Blanco' },
  { id: 6, coords: [-34.831436, -57.871377], name: 'Playa de la Isla Paulino' },
];



export const beachRatings: Record<number, UserRating[]> = {
  1: [
    {
      id: 1,
      userId: 1,
      fecha: "2025-07-01",
      comentario: "Arena muy limpia y buena vista, pero faltan atracciones.",
      rating: { arena: 4, agua: 3, concurrencia: 2, limpieza: 4, tranquilidad: 3, atracciones: 2 }
    },
    {
      id: 2,
      userId: 2,
      fecha: "2025-07-03",
      comentario: "Poca gente, ideal para descansar. El agua podría estar mejor.",
      rating: { arena: 3, agua: 2, concurrencia: 2, limpieza: 4, tranquilidad: 3, atracciones: 3 }
    },
    {
      id: 3,
      userId: 3,
      fecha: "2025-07-08",
      comentario: "Muy tranquila. Me encantó caminar por la orilla.",
      rating: { arena: 4, agua: 3, concurrencia: 1, limpieza: 4, tranquilidad: 4, atracciones: 2 }
    },
  ],
  2: [
    {
      id: 4,
      userId: 4,
      fecha: "2025-06-28",
      comentario: "Demasiada gente para mi gusto. El agua estaba bien.",
      rating: { arena: 2, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 1 }
    },
    {
      id: 5,
      userId: 5,
      fecha: "2025-07-04",
      comentario: "No es la mejor playa, pero tiene buen acceso.",
      rating: { arena: 2, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 2 }
    },
    {
      id: 6,
      userId: 6,
      fecha: "2025-07-11",
      comentario: "Ideal para grupos grandes. Arena aceptable.",
      rating: { arena: 3, agua: 4, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 2 }
    },
  ],
  3: [
    {
      id: 7,
      userId: 7,
      fecha: "2025-07-02",
      comentario: "Una playa promedio, pero cómoda para pasar el día.",
      rating: { arena: 3, agua: 3, concurrencia: 3, limpieza: 3, tranquilidad: 3, atracciones: 3 }
    },
    {
      id: 8,
      userId: 1,
      fecha: "2025-07-05",
      comentario: "Me gustó la tranquilidad. El agua estaba bastante bien.",
      rating: { arena: 3, agua: 4, concurrencia: 2, limpieza: 3, tranquilidad: 4, atracciones: 3 }
    },
    {
      id: 9,
      userId: 8,
      fecha: "2025-07-09",
      comentario: "Limpia y con algunas cosas divertidas para hacer. Volvería.",
      rating: { arena: 4, agua: 3, concurrencia: 3, limpieza: 4, tranquilidad: 3, atracciones: 4 }
    },
  ],
  4: [
    {
      id: 11,
      userId: 2,
      fecha: "2025-07-01",
      comentario: "Muy básica. No volvería salvo que mejore mucho.",
      rating: { arena: 1, agua: 2, concurrencia: 3, limpieza: 2, tranquilidad: 1, atracciones: 2 }
    },
    {
      id: 12,
      userId: 4,
      fecha: "2025-07-06",
      comentario: "Al menos estaba limpia, pero todo lo demás muy pobre.",
      rating: { arena: 2, agua: 2, concurrencia: 2, limpieza: 3, tranquilidad: 2, atracciones: 1 }
    },
    {
      id: 13,
      userId: 6,
      fecha: "2025-07-10",
      comentario: "No la recomiendo. Hay opciones mejores cerca.",
      rating: { arena: 1, agua: 1, concurrencia: 3, limpieza: 2, tranquilidad: 1, atracciones: 1 }
    },
  ],
  5: [
    {
      id: 14,
      userId: 3,
      fecha: "2025-07-02",
      comentario: "Excelente opción, todo en balance. Muy recomendable.",
      rating: { arena: 4, agua: 4, concurrencia: 3, limpieza: 4, tranquilidad: 4, atracciones: 3 }
    },
    {
      id: 15,
      userId: 5,
      fecha: "2025-07-06",
      comentario: "Linda playa aunque algo concurrida. Buenas actividades.",
      rating: { arena: 3, agua: 4, concurrencia: 4, limpieza: 4, tranquilidad: 3, atracciones: 4 }
    },
    {
      id: 16,
      userId: 7,
      fecha: "2025-07-12",
      comentario: "Muy completa, aunque un poco llena los fines de semana.",
      rating: { arena: 4, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 4, atracciones: 4 }
    },
  ],
  6: [
    {
      id: 17,
      userId: 8,
      fecha: "2025-07-01",
      comentario: "No es para todos, pero si buscás algo muy tranquilo, sirve.",
      rating: { arena: 2, agua: 2, concurrencia: 1, limpieza: 1, tranquilidad: 2, atracciones: 1 }
    },
    {
      id: 18,
      userId: 1,
      fecha: "2025-07-05",
      comentario: "Un poco descuidada. No la pasé bien.",
      rating: { arena: 1, agua: 2, concurrencia: 2, limpieza: 1, tranquilidad: 1, atracciones: 1 }
    },
    {
      id: 19,
      userId: 4,
      fecha: "2025-07-07",
      comentario: "Aceptable si no tenés muchas expectativas. Faltan servicios.",
      rating: { arena: 2, agua: 1, concurrencia: 1, limpieza: 2, tranquilidad: 2, atracciones: 2 }
    },
  ]
};




// Funciones

function roundScore(value: number): number {
  if (value < 1) return 1;
  if (value > 4) return 4;
  return Math.round(value);
}

function scaleToTen(value: number): number {
  return +(1 + (value - 1) * 3).toFixed(2);
}

export function calculateAggregatedScoresWithFinalTen(ratings: Rating[] | undefined): BeachScores | null {
  if (!ratings || ratings.length === 0) return null;

  const items: (keyof Rating)[] = ['arena', 'agua', 'concurrencia', 'limpieza', 'tranquilidad', 'atracciones'];
  const aggregated = {} as Partial<BeachScores>;

  // Calcular promedio por ítem (redondeado)
  items.forEach(item => {
    const sum = ratings.reduce((acc, r) => acc + r[item], 0);
    const avg = sum / ratings.length;
    aggregated[item] = roundScore(avg); // redondeamos a 1-4
  });

  // Calcular finalScore (decimal de 1 a 10)
  const avgRaw = items.reduce((acc, item) => {
    const sum = ratings.reduce((a, r) => a + r[item], 0);
    return acc + (sum / ratings.length);
  }, 0) / items.length;

  aggregated.finalScore = scaleToTen(avgRaw);

  return aggregated as BeachScores;
}



// Generar arreglo final con puntajes

export const beachesWithScores: BeachWithScores[] = beachLocations.map(beach => {
  const beachRating = beachRatings[beach.id] ?? [];
  const ratings = beachRating.map(r => r.rating); // <- 💡 Extraés solo la parte `rating`
  const scores = calculateAggregatedScoresWithFinalTen(ratings);

  return { ...beach, scores };
});

// Ejemplo: imprimir resultado
console.log(beachesWithScores);
