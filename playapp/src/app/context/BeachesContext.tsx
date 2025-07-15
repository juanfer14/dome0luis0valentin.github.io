// /src/app/context/BeachesContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  beachLocations,
  calculateAggregatedScoresWithFinalTen,
  beachRatings as initialBeachRatings,
  BeachWithScores,
  UserRating,
} from "@/data/beaches";

interface BeachesContextType {
  beachRatings: Record<number, UserRating[]>;
  beachesWithScores: BeachWithScores[];
  addOpinion: (beachId: number, opinion: UserRating) => void;
  editOpinion: (beachId: number, updatedOpinion: UserRating) => void;
  deleteOpinion: (beachId: number, opinionId: number) => void;
}

const BeachesContext = createContext<BeachesContextType | undefined>(undefined);

export function BeachesProvider({ children }: { children: ReactNode }) {
  const [beachRatings, setBeachRatings] =
    useState<Record<number, UserRating[]>>(initialBeachRatings);

  const [beachesWithScores, setBeachesWithScores] = useState<BeachWithScores[]>(
  () => {
    return beachLocations.map((beach) => {
      const userRatings = initialBeachRatings[beach.id] || [];
      const scores = calculateAggregatedScoresWithFinalTen(
        userRatings.map((r) => r.rating)
      );
      return { ...beach, scores };
    });
  }
);


  const updateScores = (beachId: number, updatedList: UserRating[]) => {
    const scores = calculateAggregatedScoresWithFinalTen(
      updatedList.map((r) => r.rating)
    );
    setBeachesWithScores((prev) =>
      prev.map((b) => (b.id === beachId ? { ...b, scores } : b))
    );
  };

  function addOpinion(beachId: number, opinion: UserRating) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: [...(prev[beachId] || []), opinion],
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  function editOpinion(beachId: number, updatedOpinion: UserRating) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: prev[beachId].map((op) =>
          op.id === updatedOpinion.id ? updatedOpinion : op
        ),
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  function deleteOpinion(beachId: number, opinionId: number) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: prev[beachId].filter((op) => op.id !== opinionId),
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  return (
    <BeachesContext.Provider
      value={{
        beachRatings,
        beachesWithScores,
        addOpinion,
        editOpinion,
        deleteOpinion,
      }}
    >
      {children}
    </BeachesContext.Provider>
  );
}

export function useBeaches() {
  const context = useContext(BeachesContext);
  if (!context)
    throw new Error("useBeaches must be used within BeachesProvider");
  return context;
}
