"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Library = {
  id: string;
  title: string;
  platform: "Xbox" | "Steam" | "Mobile";
  playtime: number;
  achievements: number;
};

export const columns: ColumnDef<Library>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "playtime",
    header: "Playtime (Hours)",
  },
  {
    accessorKey: "achievements",
    header: "Achievements",
  },
];
