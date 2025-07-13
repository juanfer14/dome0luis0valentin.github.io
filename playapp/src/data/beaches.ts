// src/data/beaches.ts
export const beachLevelIconUrls = {
  nivel1: '/images/1.png',
  nivel2: '/images/2.png',
  nivel3: '/images/3.png',
  nivel4: '/images/4.png'
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

export const beachRatings: Record<number, Rating[]> = {
  1: [
    { arena: 4, agua: 3, concurrencia: 2, limpieza: 4, tranquilidad: 3, atracciones: 2 },
    { arena: 3, agua: 2, concurrencia: 2, limpieza: 4, tranquilidad: 3, atracciones: 3 },
    { arena: 4, agua: 3, concurrencia: 1, limpieza: 4, tranquilidad: 4, atracciones: 2 },
  ],
  2: [
    { arena: 2, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 1 },
    { arena: 2, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 2 },
    { arena: 3, agua: 4, concurrencia: 4, limpieza: 3, tranquilidad: 2, atracciones: 2 },
  ],
  3: [
    { arena: 3, agua: 3, concurrencia: 3, limpieza: 3, tranquilidad: 3, atracciones: 3 },
    { arena: 3, agua: 4, concurrencia: 2, limpieza: 3, tranquilidad: 4, atracciones: 3 },
    { arena: 4, agua: 3, concurrencia: 3, limpieza: 4, tranquilidad: 3, atracciones: 4 },
  ],
  4: [
    { arena: 1, agua: 2, concurrencia: 3, limpieza: 2, tranquilidad: 1, atracciones: 2 },
    { arena: 2, agua: 2, concurrencia: 2, limpieza: 3, tranquilidad: 2, atracciones: 1 },
    { arena: 1, agua: 1, concurrencia: 3, limpieza: 2, tranquilidad: 1, atracciones: 1 },
  ],
  5: [
    { arena: 4, agua: 4, concurrencia: 3, limpieza: 4, tranquilidad: 4, atracciones: 3 },
    { arena: 3, agua: 4, concurrencia: 4, limpieza: 4, tranquilidad: 3, atracciones: 4 },
    { arena: 4, agua: 3, concurrencia: 4, limpieza: 3, tranquilidad: 4, atracciones: 4 },
  ],
  6: [
    { arena: 2, agua: 2, concurrencia: 1, limpieza: 1, tranquilidad: 2, atracciones: 1 },
    { arena: 1, agua: 2, concurrencia: 2, limpieza: 1, tranquilidad: 1, atracciones: 1 },
    { arena: 2, agua: 1, concurrencia: 1, limpieza: 2, tranquilidad: 2, atracciones: 2 },
  ],
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

  // Calcular promedio **con decimales** por ítem
  items.forEach(item => {
    const sum = ratings.reduce((acc, r) => acc + r[item], 0);
    const avg = sum / ratings.length;
    aggregated[item] = roundScore(avg); // para ítems mantenemos 1-4 redondeado
  });

  // Calcular promedio decimal sin redondear para finalScore
  const avgRaw = items.reduce((acc, item) => acc + (ratings.reduce((a, r) => a + r[item], 0) / ratings.length), 0) / items.length;
  aggregated.finalScore = scaleToTen(avgRaw);

  return aggregated as BeachScores;
}


// Generar arreglo final con puntajes

export const beachesWithScores: BeachWithScores[] = beachLocations.map(beach => {
  const ratings = beachRatings[beach.id];
  const scores = calculateAggregatedScoresWithFinalTen(ratings);
  return { ...beach, scores };
});

// Ejemplo: imprimir resultado
console.log(beachesWithScores);
