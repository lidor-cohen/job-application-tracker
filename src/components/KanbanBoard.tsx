"use client";
import React from "react";
import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Mic,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CreateJobApplicationDialog from "@/components/CreateJobApplicationDialog";
import JobCard from "@/components/JobCard";
import { useBoard } from "@/lib/hooks/useBoards";

type KanbanBoardProps = {
  board: Board;
  userId: string;
};

interface ColumnConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColumnConfig> = [
  { color: "bg-cyan-500", icon: <Calendar className="w-4 h-4" /> },
  { color: "bg-purple-500", icon: <CheckCircle className="w-4 h-4" /> },
  { color: "bg-green-500", icon: <Mic className="w-4 h-4" /> },
  { color: "bg-yellow-500", icon: <Award className="w-4 h-4" /> },
  { color: "bg-red-500", icon: <Briefcase className="w-4 h-4" /> },
];

const KanbanItem = ({
  column,
  config,
  board,
  sortedColumns,
}: {
  column: Column;
  config: ColumnConfig;
  board: string;
  sortedColumns?: Column[];
}) => {
  const sortedJobs =
    column.jobApplications.sort((a, b) => (a.order > b.order ? 1 : -1)) || [];
  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      <CardHeader className={`${config.color} text-white rounded-t-lg py-3`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
        {sortedJobs.map((job, key) => (
          <SortableJobCard
            key={job._id || key}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={sortedColumns || []}
          />
        ))}

        <CreateJobApplicationDialog columnId={column._id} boardId={board} />
      </CardContent>
    </Card>
  );
};

const SortableJobCard = ({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) => {
  return (
    <div>
      <JobCard job={job} columns={columns} />
    </div>
  );
};

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const { columns, moveJob } = useBoard(board);
  const sortedColumns =
    columns.sort((a, b) => (a.order > b.order ? 1 : -1)) || [];

  return (
    <>
      <div>
        <div>
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key % COLUMN_CONFIG.length];
            return (
              <KanbanItem
                key={key}
                column={col}
                config={config}
                board={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default KanbanBoard;
