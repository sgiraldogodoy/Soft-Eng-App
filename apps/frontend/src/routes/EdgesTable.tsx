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

export function EdgesTable() {
  const { data, isLoading, isError } = trpc.db.getAllEdges.useQuery();

  if (isError) {
    return <p>Error!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <TableCaption>Edges</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Edge ID</TableHead>
          <TableHead>Start Node ID</TableHead>
          <TableHead>End Node ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((n) => (
          <TableRow>
            <TableCell>{n.id}</TableCell>
            <TableCell>{n.startNodeId}</TableCell>
            <TableCell>{n.endNodeId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
