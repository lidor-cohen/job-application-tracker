interface Board {
  _id: string;
  name: string;
  userId: string;
  columns: Column[];
}

interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
}

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  columnId?: string;
}

export type { Board, Column, JobApplication };
