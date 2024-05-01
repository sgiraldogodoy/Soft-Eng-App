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
  PlusIcon,
  Spline,
} from "lucide-react";
import { Route, useLocation } from "wouter";
import { ZCreateNodeSchema as nodeSchema } from "common";
import { z } from "zod";
import { CreateNodeDialog } from "@/components/CreateNodeDialog.tsx";
import { CreateEdgeDialog } from "@/components/CreateEdgeDialog.tsx";
import { CreateStaffDialog } from "@/components/CreateStaffDialog.tsx";
import { AdminOnly } from "@/components/AdminOnly";
const newNodeSchema = nodeSchema.omit({ id: true });

export function InspectDatabase() {
  const createNode = trpc.node.createOne.useMutation();
  const createEdge = trpc.edge.createOne.useMutation();
  const createStaff = trpc.staff.createOne.useMutation();
  const uploadButton = useRef<HTMLInputElement>(null);

  const downloadNodes = trpc.node.csvExport.useQuery();
  const downloadEdges = trpc.edge.csvExport.useQuery();
  const downloadEmployees = trpc.staff.csvExport.useQuery();

  const utils = trpc.useUtils();

  const nodeMutation = trpc.node.csvUpload.useMutation();
  const edgeMutation = trpc.edge.csvUpload.useMutation();
  const staffMutation = trpc.staff.csvUpload.useMutation();

  const [, setLocation] = useLocation();

  const handleCreateNodeSubmit = (data: z.infer<typeof newNodeSchema>) => {
    createNode.mutate(
      {
        data,
      },
      {
        onSuccess: () => {
          utils.node.getAll.invalidate();
        },
      },
    );
  };

  const handleCreateEdgeSubmit = (startNodeId: string, endNodeId: string) => {
    createEdge.mutate(
      {
        startNodeId,
        endNodeId,
      },
      {
        onSuccess: () => {
          utils.edge.getAll.invalidate();
        },
      },
    );
  };

  const handleCreateEmployeeSubmit = (name: string, jobTitle: string) => {
    createStaff.mutate(
      {
        name,
        jobTitle,
      },
      {
        onSuccess: () => {
          utils.staff.getAll.invalidate();
        },
      },
    );
  };

  return (
    <>
      <AdminOnly />
      <Tabs defaultValue="nodes" asChild>
        <div className="relative h-full min-h-full p-6 flex flex-col gap-2 overflow-auto">
          <div className="absolute bottom-0 left-0 w-full h-full">
            <img
              src="/wave.svg"
              alt="Wave"
              className="absolute bottom-0 left-0 "
            />
          </div>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="gap-1 animate-in fade-in zoom-in-105 duration-400 fill-mode-both"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => {
                    setLocation("/create/node");
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
                    setLocation("/create/edge");
                  }}
                >
                  Edges
                  <Spline color="hsla(var(--primary) / 0.5)" className="pl-1" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => {
                    setLocation("/create/employee");
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
          </div>
          <Card className="relative h-full max-h-full p-4 overflow-auto animate-in fade-in duration-500 zoom-in-105 delay-400 fill-mode-both bg-white/90 backdrop-blur-md">
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
                      success: "Done!",
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
                      success: "Done!",
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
                      success: "Done!",
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
      <Route path="/create/node" nest>
        <CreateNodeDialog
          open={true}
          onOpenChange={() => setLocation("/")}
          onSubmit={handleCreateNodeSubmit}
        />
      </Route>
      <Route path="/create/edge" nest>
        <CreateEdgeDialog
          open={true}
          onOpenChange={() => setLocation("/")}
          onSubmit={handleCreateEdgeSubmit}
        />
      </Route>
      <Route path="/create/employee" nest>
        <CreateStaffDialog
          open={true}
          onOpenChange={() => setLocation("/")}
          onSubmit={handleCreateEmployeeSubmit}
        />
      </Route>
    </>
  );
}
