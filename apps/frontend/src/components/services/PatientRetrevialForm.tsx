import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { trpc } from "@/utils/trpc";
/*import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";*/
/*import { type ZCreatePatientSchema } from "common";
import { z } from "zod";*/
import { LoadingSpinner } from "@/components/ui/loader.tsx";
import RequestPatientTable from "@/components/services/RequestPatientTable.tsx";

export default function RequestSummary() {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {},
  );

  // const utils = trpc.useUtils();

  const patientQuery = trpc.patient.getAll.useQuery();
  /*const patientDeleteMutation = trpc.patient.deleteOne.useMutation();

    const updateStatus = trpc.patient.updateOne.useMutation();*/

  const allRequests = patientQuery.data;

  /*const selectedRowId = useMemo(
        () => Object.keys(rowSelectionState)[0],
        [rowSelectionState],
    );

    const selectedRow = useMemo(
        () =>
            patientQuery.data && selectedRowId
                ? patientQuery.data.find((r) => r.id === selectedRowId)
                : undefined,
        [selectedRowId, patientQuery],
    );*/

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
      {/*{selectedRow && (
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
            )}*/}
    </div>
  );
}

/*
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export default function PatientRetrevial() {
  const formSchema = z.object({
    patient: z.string().min(0, {}),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <FormField
          control={form.control}
          name="patient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Search for a Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="MassHealth">MassHealth</SelectItem>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
*/
