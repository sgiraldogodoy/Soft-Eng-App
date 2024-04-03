import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EdgesTable } from "./EdgesTable";
import { NodesTable } from "./NodesTable";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { trpc } from "@/utils/trpc";
import { getBase64 } from "@/utils/files";
import { toast } from "sonner";

export function InspectDatabase() {
  const uploadButton = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  const nodeMutation = trpc.db.csvUploadNodes.useMutation();
  const edgeMutation = trpc.db.csvUploadEdges.useMutation();

  return (
    <>
      <div className="w-full h-screen">
        <Tabs defaultValue="nodes">
          <div className="w-full flex items-center justify-center p-4">
            <TabsList>
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="edges">Edges</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="nodes">
            <NodesTable />
          </TabsContent>
          <TabsContent value="edges">
            <EdgesTable />
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

            if (text.includes("nodeID")) {
              toast.promise(
                nodeMutation.mutateAsync(
                  {
                    buffer: base64,
                  },
                  {
                    onSuccess() {
                      utils.db.getAllNodes.invalidate();
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
                      utils.db.getAllEdges.invalidate();
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
      </div>
    </>
  );
}
