import {
  Card,
  CardContent,
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
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loader.tsx";
import RequestPatientTable from "@/components/services/RequestPatientTable.tsx";
import { X } from "lucide-react";
import { DateTime } from "luxon";

export default function RequestSummary() {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {},
  );

  const utils = trpc.useUtils();

  const patientQuery = trpc.patient.getAll.useQuery();
  const patientDeleteMutation = trpc.patient.deleteOne.useMutation();

  const allRequests = patientQuery.data;

  const selectedRowId = useMemo(
    () => Object.keys(rowSelectionState)[0],
    [rowSelectionState],
  );

  const selectedRow = useMemo(
    () =>
      patientQuery.data && selectedRowId
        ? patientQuery.data.find((r) => r.id === selectedRowId)
        : undefined,
    [selectedRowId, patientQuery],
  );

  if (patientQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (patientQuery.isError) {
    return <p>Error!</p>;
  }

  if (!patientQuery.data) {
    return <p>No data.</p>;
  }

  console.log(rowSelectionState);

  return (
    <div className="w-full flex flex-col gap-4 flex-1 max-h-full animate-in zoom-in-105 fade-in duration-500">
      <Card className="flex flex-col flex-1 overflow-auto bg-white/90 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Patients</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-scroll max-h-full">
          <RequestPatientTable
            data={allRequests ?? []}
            selectionState={rowSelectionState}
            setSelectionState={setRowSelectionState}
          />
        </CardContent>
      </Card>
      {selectedRow && (
        <Card className="p-4 bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex flex-row justify-between">
              Details
              <span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setRowSelectionState({});
                  }}
                >
                  <X />
                </Button>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(selectedRow ?? {}).map(([key, value]) => {
              if (
                key === "id" ||
                key === "location" ||
                key === "pcp" ||
                key === "user" ||
                key === "notes"
              )
                return;

              const newVal =
                value instanceof Date
                  ? z.coerce
                      .string()
                      .safeParse(
                        DateTime.fromJSDate(value).toLocaleString(
                          DateTime.DATE_SHORT,
                        ),
                      )
                  : z.coerce.string().safeParse(value);
              if (
                !newVal.success ||
                newVal.data === "null" ||
                newVal.data === ""
              )
                return;

              return (
                <div className="flex items-center justify-between gap-2">
                  <p className="capitalize">{key}</p>
                  <hr className="flex-1 border-slate-400 border-dotted" />
                  <p className="capitalize">{newVal.data}</p>
                </div>
              );
            })}
            <br />
            <div className="grid gap-1.5">
              <Label htmlFor="message-2" className="font-bold">
                Patient Notes
              </Label>
              <p>{selectedRow.notes}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-stretch w-full self-center gap-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  toast.promise(
                    patientDeleteMutation.mutateAsync(
                      {
                        id: selectedRow.id,
                      },
                      {
                        onSuccess: () => {
                          utils.patient.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      success: "Deleted patient!",
                      error: "Error deleting patient.",
                      loading: "Deleting patient...",
                    },
                  );
                }}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
