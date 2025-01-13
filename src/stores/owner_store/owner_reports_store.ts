import { create } from "zustand";

interface Report {
  _id: string;
  priority: "low" | "medium" | "high";
  description: string;
  vehicle: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface ReportsResponse {
  reports: Report[] | null;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;

  updateReports: (reports: ReportsResponse) => void;
}

export const useOwnerReportsStore = create<ReportsResponse>((set) => ({
  reports: null,
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,

  updateReports: (data) =>
    set(() => {
      return ({
        reports: data.reports?.docs ?? null,
        totalDocs: data.totalDocs,
        limit: data.limit,
        totalPages: data.totalPages,
        page: data.page,
        pagingCounter: data.pagingCounter,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
      })
    }),
}));
