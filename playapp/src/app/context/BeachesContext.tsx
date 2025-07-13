"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { beachLocations, calculateAggregatedScoresWithFinalTen, beachRatings as initialBeachRatings, Rating, BeachWithScores } from "@/data/beaches";

interface BeachesContextType {
  beachRatings: Record<number, Rating[]>;
  beachesWithScores: BeachWithScores[];
  addOpinion: (beachId: number, newRating: Rating) => void;
}

const BeachesContext = createContext<BeachesContextType | undefined>(undefined);

export function BeachesProvider({ children }: { children: ReactNode }) {
  const [beachRatings, setBeachRatings] = useState<Record<number, Rating[]>>(() => {
    return { ...initialBeachRatings };
  });

  const [beachesWithScores, setBeachesWithScores] = useState<BeachWithScores[]>(() => {
    return beachLocations.map(beach => {
      const ratings = beachRatings[beach.id];
      const scores = calculateAggregatedScoresWithFinalTen(ratings);
      return { ...beach, scores };
    });
  });

  function addOpinion(beachId: number, newRating: Rating) {
    setBeachRatings(prev => {
      const updatedRatings = {
        ...prev,
        [beachId]: [...(prev[beachId] || []), newRating],
      };

      setBeachesWithScores(prevBeaches =>
        prevBeaches.map(b => {
          if (b.id === beachId) {
            return {
              ...b,
              scores: calculateAggregatedScoresWithFinalTen(updatedRatings[beachId]),
            };
          }
          return b;
        })
      );

      return updatedRatings;
    });
  }

  return (
    <BeachesContext.Provider value={{ beachRatings, beachesWithScores, addOpinion }}>
      {children}
    </BeachesContext.Provider>
  );
}

export function useBeaches() {
  const context = useContext(BeachesContext);
  if (!context) throw new Error("useBeaches must be used within BeachesProvider");
  return context;
}
