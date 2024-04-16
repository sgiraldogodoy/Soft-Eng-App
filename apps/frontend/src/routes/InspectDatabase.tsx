import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EdgesTable } from "./EdgesTable";
import { NodesTable } from "./NodesTable";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { trpc } from "@/utils/trpc";
import { getBase64 } from "@/utils/files";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";

export function InspectDatabase() {
  const uploadButton = useRef<HTMLInputElement>(null);

  const downloadNodes = trpc.node.csvExport.useQuery();
  const downloadEdges = trpc.edge.csvExport.useQuery();

  const utils = trpc.useUtils();

  const nodeMutation = trpc.node.csvUpload.useMutation();
  const edgeMutation = trpc.edge.csvUpload.useMutation();

  return (
    <>
      <BackgroundGradientAnimation className="overflow-hidden">
        <div className="w-full h-screen relative">
          <Card className="m-10 relative">
            <Tabs defaultValue="nodes">
              <div className="w-full flex items-center justify-center p-4">
                <TabsList>
                  <TabsTrigger value="nodes">Nodes</TabsTrigger>
                  <TabsTrigger value="edges">Edges</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="nodes">
                <NodesTable />

                <Button
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
                  className="absolute top-[16px] right-[104px]"
                >
                  Download
                </Button>
              </TabsContent>
              <TabsContent value="edges">
                <EdgesTable />
                <Button
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
                  className="absolute top-[16px] right-[104px]"
                >
                  Download
                </Button>
              </TabsContent>
            </Tabs>
            <Button
              onClick={() => {
                uploadButton.current?.click();
              }}
              className="absolute top-[16px] right-4"
            >
              Upload
            </Button>

            <input
              ref={uploadButton}
              onChange={async (e) => {
                const files = e.target.files;

                console.log("changed");

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
                } else {
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
                      loading: "Adding nodes...",
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
      </BackgroundGradientAnimation>
    </>
  );
}
