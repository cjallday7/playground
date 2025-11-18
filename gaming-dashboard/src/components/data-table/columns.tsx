"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Library = {
  id: string;
  title: string;
  platform: "Xbox" | "Steam" | "Mobile";
  playtime: number;
  achievements: number;
  lastPlayed: number;
};

export const columns: ColumnDef<Library>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
  {
    accessorKey: "lastPlayed",
    header: "Last Played",
  },
];
