"use client";

import { Board, Column } from "@/lib/models/models.types";
import { useState } from "react";

export const useBoard = (initialBoard?: Board | null) => {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  const moveJob = async (
    jobId: string,
    newColumnId: string,
    newOrder: string,
  ) => {};

  return { board, columns, error, moveJob };
};
