import RequestTable from "@/components/services/RequestTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMemo, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { trpc } from "@/utils/trpc";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { motion } from "framer-motion";
import { type ZCreateBaseServiceSchema } from "common";
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loader.tsx";

export default function RequestSummary() {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {},
  );

  const utils = trpc.useUtils();

  const servicesQuery = trpc.service.getAll.useQuery();
  const serviceDeleteMutation = trpc.service.deleteOne.useMutation();
  // const serviceDeliverMutation = trpc.service.deliver.useMutation();

  const updateStatus = trpc.service.updateOne.useMutation();

  const allRequests = servicesQuery.data;

  const selectedRowId = useMemo(
    () => Object.keys(rowSelectionState)[0],
    [rowSelectionState],
  );

  const selectedRow = useMemo(
    () =>
      servicesQuery.data && selectedRowId
        ? servicesQuery.data.find((r) => r.id === selectedRowId)
        : undefined,
    [selectedRowId, servicesQuery],
  );

  if (servicesQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (servicesQuery.isError) {
    return <p>Error!</p>;
  }

  if (!servicesQuery.data) {
    return <p>No data.</p>;
  }

  console.log(rowSelectionState);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, type: "easeOut" }}
      className="w-full flex flex-col gap-4 flex-1 max-h-full"
    >
      <Card className="flex flex-col flex-1 overflow-auto bg-white/90 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Open Requests</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-scroll max-h-full">
          <RequestTable
            data={allRequests ?? []}
            selectionState={rowSelectionState}
            setSelectionState={setRowSelectionState}
          />
        </CardContent>
      </Card>
      {selectedRow && (
        <Card className="p-4 bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              {selectedRow.type} requested by {selectedRow.login}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.entries(selectedRow[selectedRow.type] ?? {}).map(
              ([key, value]) => {
                if (key === "id" || key === "serviceId") return;

                const newVal = z.coerce.string().safeParse(value);
                if (!newVal.success) return;

                return (
                  <div className="flex items-center justify-between gap-2">
                    <p className="capitalize">{key}</p>
                    <hr className="flex-1 border-slate-400 border-dotted" />
                    <p className="capitalize">{newVal.data}</p>
                  </div>
                );
              },
            )}
            <br />
            <div className="grid gap-1.5">
              <Label htmlFor="message-2" className="font-bold">
                Request Notes
              </Label>
              <p>{selectedRow.note}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-stretch w-full self-center gap-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  toast.promise(
                    serviceDeleteMutation.mutateAsync(
                      {
                        id: selectedRow.id,
                      },
                      {
                        onSuccess: () => {
                          utils.service.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      success: "Deleted request!",
                      error: "Error deleting request.",
                      loading: "Deleting request...",
                    },
                  );
                }}
              >
                Delete
              </Button>
              <Select
                value={selectedRow.status}
                onValueChange={(newVal) => {
                  toast.promise(
                    updateStatus.mutateAsync(
                      {
                        id: selectedRow.id,
                        data: {
                          status: newVal as z.infer<
                            typeof ZCreateBaseServiceSchema
                          >["status"],
                        },
                      },
                      {
                        onSuccess() {
                          utils.service.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      success: "Changed status to " + newVal,
                      loading: "Updating status...",
                      error: "Error updating status.",
                    },
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                  <SelectItem value="ASSIGNED">Assigned</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
}
