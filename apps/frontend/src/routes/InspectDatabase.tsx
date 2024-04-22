import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EdgesTable } from "./EdgesTable";
import { NodesTable } from "./NodesTable";
import { StaffTable } from "./StaffTable";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { trpc } from "@/utils/trpc";
import { getBase64 } from "@/utils/files";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  CircleDotIcon,
  CloudUpload,
  ContactRound,
  DownloadCloudIcon,
  Spline,
} from "lucide-react";

export function InspectDatabase() {
  const uploadButton = useRef<HTMLInputElement>(null);

  const downloadNodes = trpc.node.csvExport.useQuery();
  const downloadEdges = trpc.edge.csvExport.useQuery();
  const downloadEmployees = trpc.staff.csvExport.useQuery();

  const utils = trpc.useUtils();

  const nodeMutation = trpc.node.csvUpload.useMutation();
  const edgeMutation = trpc.edge.csvUpload.useMutation();
  const staffMutation = trpc.staff.csvUpload.useMutation();

  return (
    <>
      <Tabs defaultValue="nodes" asChild>
        <div className="relative h-full max-h-full p-6 flex flex-col gap-2 overflow-auto">
          <div className="flex items-center gap-2">
            <TabsList className="animate-in fade-in zoom-in-105 duration-400 fill-mode-both">
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="edges">Edges</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 ml-auto animate-in fade-in zoom-in-105 duration-400 fill-mode-both"
                >
                  <DownloadCloudIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Download
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => {
                    const base64String = downloadNodes.data ?? "";
                    const decodedString = atob(base64String);
                    const blob = new Blob([decodedString], {
                      type: "text/csv",
                    });
                    const anchor = document.createElement("a");
                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.download = "nodes-csv-file.csv";
                    document.body.appendChild(anchor);

                    anchor.click();
                  }}
                >
                  Nodes
                  <CircleDotIcon
                    color="hsla(var(--primary) / 0.5)"
                    className="pl-1"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => {
                    const base64String = downloadEdges.data ?? "";
                    const decodedString = atob(base64String);
                    const blob = new Blob([decodedString], {
                      type: "text/csv",
                    });
                    const anchor = document.createElement("a");
                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.download = "edges-csv-file.csv";
                    document.body.appendChild(anchor);

                    anchor.click();
                  }}
                >
                  Edges
                  <Spline color="hsla(var(--primary) / 0.5)" className="pl-1" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => {
                    const base64String = downloadEmployees.data ?? "";
                    const decodedString = atob(base64String);
                    const blob = new Blob([decodedString], {
                      type: "text/csv",
                    });
                    const anchor = document.createElement("a");
                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.download = "employees-csv-file.csv";
                    document.body.appendChild(anchor);

                    anchor.click();
                  }}
                >
                  Employees
                  <ContactRound
                    color="hsla(var(--primary) / 0.5)"
                    className="pl-1"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => {
                uploadButton.current?.click();
              }}
              size="sm"
              variant="outline"
              className="gap-1 animate-in fade-in zoom-in-105 duration-400 fill-mode-both delay-300"
            >
              <CloudUpload className="h-4 w-4" />
              Upload
            </Button>
          </div>
          <Card className="relative max-h-full p-4 overflow-auto animate-in fade-in duration-400 zoom-in-105 delay-400 fill-mode-both">
            <TabsContent value="nodes">
              <NodesTable />
            </TabsContent>
            <TabsContent value="edges">
              <EdgesTable />
            </TabsContent>
            <TabsContent value="employees">
              <StaffTable />
            </TabsContent>
            <input
              ref={uploadButton}
              onChange={async (e) => {
                const files = e.target.files;

                // console.log("changed");

                if (!files || files.length == 0) return;

                const text = await files[0].text();
                const base64: string = (await getBase64(files[0])) as string;
                console.log(base64);

                if (text.toLowerCase().includes("floor")) {
                  toast.promise(
                    nodeMutation.mutateAsync(
                      {
                        buffer: base64,
                      },
                      {
                        onSuccess() {
                          utils.node.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      loading: "Adding nodes...",
                      success: "Done N!",
                      error: "An error occured.",
                    },
                  );
                } else if (text.toLowerCase().includes("startnode")) {
                  toast.promise(
                    edgeMutation.mutateAsync(
                      {
                        buffer: base64,
                      },
                      {
                        onSuccess() {
                          utils.edge.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      loading: "Adding Edges...",
                      success: "Done E!",
                      error: "An error occured.",
                    },
                  );
                } else {
                  toast.promise(
                    staffMutation.mutateAsync(
                      {
                        buffer: base64,
                      },
                      {
                        onSuccess() {
                          utils.staff.getAll.invalidate();
                        },
                      },
                    ),
                    {
                      loading: "Adding Employees...",
                      success: "Done Emp!",
                      error: "An error occured.",
                    },
                  );
                }
              }}
              type="file"
              multiple={false}
              hidden
            />
          </Card>
        </div>
      </Tabs>
    </>
  );
}
