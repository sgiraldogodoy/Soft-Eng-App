

import { ColumnDef } from "@tanstack/react-table"

export type Request = {
    requester: string
    location: string
    notes: string
}

export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: "requester",
        header: "Requester",
    },
    {
        accessorKey: "location",
        header: "Location",
    },

]