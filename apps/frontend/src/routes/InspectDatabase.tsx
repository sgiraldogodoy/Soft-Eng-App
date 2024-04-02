import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/utils/trpc";

export function InspectDatabase() {
  const { data, isError, isLoading } = trpc.db.getAllNodes.useQuery();

  if (isError) {
    return <p>Error!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Something went wrong.</p>;
  }

  return (
    <>
      <div className="w-screen h-screen">
        <Table>
          <TableCaption>Nodes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Node ID</TableHead>
              <TableHead>X Coordinate</TableHead>
              <TableHead>Y Coordinate</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Node Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Short Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((n) => (
              <TableRow>
                <TableCell>{n.nodeId}</TableCell>
                <TableCell>{n.ycords}</TableCell>
                <TableCell>{n.building}</TableCell>
                <TableCell>{n.floor}</TableCell>
                <TableCell>{n.nodeType}</TableCell>
                <TableCell>{n.longName}</TableCell>
                <TableCell>{n.shortName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
