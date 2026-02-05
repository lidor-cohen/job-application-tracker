"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { useEffect, useState } from "react";
import { updateJobApplication } from "@/lib/actions/job-applications";

export const useBoard = (initialBoard?: Board | null) => {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns);
    }
  }, [initialBoard]);

  const moveJob = async (
    jobId: string,
    newColumnId: string,
    newOrder: number,
  ) => {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex((j) => j._id === jobId);
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];
          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });
          const jobsWithUpdatedOrder = updatedJobs.map((job, index) => ({
            ...job,
            order: index * 100,
          }));
          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrder,
          };
        }
      }
      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch {
      console.error("Failed to move job");
    }
  };

  return { board, columns, error, moveJob };
};
