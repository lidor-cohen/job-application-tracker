"use server";

import { getSession } from "@/lib/auth/auth";
import dbConnect from "@/lib/mongodb";
import { Board, Column, JobApplication } from "@/lib/models";
import { revalidatePath } from "next/cache";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  notes?: string;
  columnId: string;
  boardId: string;
}

export const createJobApplication = async (data: JobApplicationData) => {
  const session = await getSession();
  if (!session?.user) return { error: "Unauthorized" };

  await dbConnect();

  console.log(data);

  const {
    company,
    position,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    columnId,
    boardId,
  } = data;

  if (!company || !position || !columnId || !boardId)
    return { error: "Missing required fields" };

  // Verify ownership of board
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });
  if (!board) return { error: "Board not found" };

  // Verify ownership of column
  const column = await Column.findOne({ _id: columnId, boardId: boardId });
  if (!column) return { error: "Column not found" };

  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({
      order: -1,
    })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    salary,
    jobUrl,
    tags: tags || [],
    description,
    notes,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
    columnId,
    boardId,
    userId: session.user.id,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
};

export const updateJobApplication = async (
  jobApplicationId: string,
  updates: {
    company?: string;
    position?: string;
    location?: string;
    salary?: string;
    jobUrl?: string;
    tags?: string[];
    description?: string;
    notes?: string;
    columnId?: string;
    boardId?: string;
    order?: number;
  },
) => {
  const session = await getSession();
  if (!session?.user) return { error: "Unauthorized" };

  await dbConnect();
  const jobApplication = await JobApplication.findById(jobApplicationId);
  if (!jobApplication) return { error: "Job Application not found" };
  if (jobApplication.userId !== session.user.id)
    return { error: "Unauthorized" };

  const { columnId, order, ...otherUpdates } = updates;
  const updatesToApply: Partial<{
    company: string;
    position: string;
    location: string;
    salary: string;
    jobUrl: string;
    tags: string[];
    description: string;
    notes: string;
    columnId: string;
    boardId: string;
    order: number;
  }> = otherUpdates;

  const currentColumnId = jobApplication.columnId.toString();
  const newColumnId = columnId?.toString();

  const isMovingToDifferentColumn =
    newColumnId && newColumnId !== currentColumnId;
  if (isMovingToDifferentColumn) {
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: {
        jobApplications: jobApplicationId,
      },
    });

    const jobsInTargetColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: jobApplicationId },
    })
      .sort({ order: 1 })
      .lean();

    let newOrderValue: number;
    if (order !== undefined && order !== null) {
      newOrderValue = order * 100;
      const jobsThatNeedToShift = jobsInTargetColumn.slice(order);
      for (const job of jobsThatNeedToShift) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else {
      if (jobsInTargetColumn.length > 0) {
        const lastJobOrder =
          jobsInTargetColumn[jobsInTargetColumn.length - 1].order || 0;
        newOrderValue = lastJobOrder + 100;
      } else {
        newOrderValue = 0;
      }
    }
    updatesToApply.columnId = newColumnId;
    updatesToApply.order = newOrderValue;

    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: jobApplicationId },
    });
  } else if (order !== undefined && order !== null) {
    const otherJobsInColumn = await JobApplication.find({
      columnId: currentColumnId,
      _id: { $ne: jobApplicationId },
    })
      .sort({ order: 1 })
      .lean();

    const currentJobOrder = jobApplication.order || 0;
    const currentPositionIndex = otherJobsInColumn.findIndex(
      (job) => job.order > currentJobOrder,
    );

    const oldPositionIndex =
      currentPositionIndex === -1
        ? otherJobsInColumn.length
        : currentPositionIndex;

    const newOrderValue = order * 100;
    if (order < oldPositionIndex) {
      const jobToShiftDown = otherJobsInColumn.slice(order, oldPositionIndex);
      for (const job of jobToShiftDown) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else if (order > oldPositionIndex) {
      const jobToShiftUp = otherJobsInColumn.slice(oldPositionIndex, order);
      for (const job of jobToShiftUp) {
        const newOrder = Math.max(0, job.order - 100);
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: newOrder },
        });
      }
    }

    updatesToApply.order = newOrderValue;
  }
  const updated = await JobApplication.findByIdAndUpdate(
    jobApplicationId,
    updatesToApply,
    { new: true },
  );

  return { data: JSON.parse(JSON.stringify(updated)) };
};
