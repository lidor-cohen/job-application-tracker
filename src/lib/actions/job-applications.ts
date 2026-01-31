"use server";

import { getSession } from "@/lib/auth/auth";
import dbConnect from "@/lib/mongodb";
import { Board, Column, JobApplication } from "@/lib/models";

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

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
};
