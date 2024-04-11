import RequestTable from "@/components/services/RequestTable";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { trpc } from "@/utils/trpc";
import { BaseFormSchema } from "./formSchema";
import { z } from "zod";

interface RequestSummaryProps {
  requests: (z.infer<typeof BaseFormSchema> & { type: string })[];
}

export default function RequestSummary({ requests }: RequestSummaryProps) {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {},
  );

  // const utils = trpc.useUtils();

  const servicesQuery = trpc.service.getAllFlowerRequests.useQuery();
  // const serviceDeleteMutation = trpc.service.deleteFlowerRequest.useMutation();
  // const serviceDeliverMutation = trpc.service.deliver.useMutation();

  const dbRequests:
    | {
        recipient: string;
        location: string;
        priority: "Low" | "Medium" | "High" | "Emergency";
        notes?: string | undefined;
        type: string;
      }[]
    | undefined = servicesQuery.data?.map((d) => {
    return {
      recipient: d.recipient,
      location: d.nodeId ?? "",
      priority: d.priority as "Low" | "Medium" | "High" | "Emergency",
      notes: d.commentOnFlower,
      type: "flower-request",
    };
  });

  const addedRequests = [...requests, ...(dbRequests ?? [])];

  if (servicesQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (servicesQuery.isError) {
    return <p>Error!</p>;
  }

  if (!servicesQuery.data) {
    return <p>No data.</p>;
  }

  console.log(rowSelectionState);

  // const rowId = Object.keys(rowSelectionState)[0];

  // const selectedRow = rowId
  //   ? servicesQuery.data.at(parseInt(rowId))
  //   : undefined;

  return (
    <div className="w-full flex flex-col gap-4 flex-1 max-h-full">
      <Card className="flex flex-col flex-1 overflow-auto bg-white/90 backdrop-blur-md drop-shadow-md shadow-inner">
        <CardHeader>
          <CardTitle>Open Requests</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-scroll max-h-full">
          <RequestTable
            data={addedRequests}
            selectionState={rowSelectionState}
            setSelectionState={setRowSelectionState}
          />
        </CardContent>
      </Card>
      {/* selectedRow && (
        <Card className="p-4 bg-white/90 backdrop-blur-md drop-shadow-md shadow-inner">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              {selectedRow.flowerName} requested by {selectedRow.loginName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1.5">
              <Label htmlFor="message-2" className="font-bold">
                Request Notes
              </Label>
              <p>{selectedRow.commentOnFlower}</p>
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
                          utils.service.getAllFlowerRequests.invalidate();
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
              <Button
                className="w-full"
                onClick={() => {
                  toast.promise(
                    serviceDeliverMutation.mutateAsync(
                      {
                        id: selectedRow.id,
                      },
                      {
                        onSuccess: () => {
                          utils.service.getAllFlowerRequests.invalidate();
                        },
                      },
                    ),
                    {
                      success: "Marked request as delivered!",
                      error: "Error updating request.",
                      loading: "Updating request...",
                    },
                  );
                }}
              >
                Mark as Delivered
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}*/}
    </div>
  );
}
