import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { trpc } from "@/utils/trpc";

export function NodesTable() {
  const { data, isLoading, isError } = trpc.node.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
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
        {data?.map((n) => (
          <TableRow>
            <TableCell>{n.id}</TableCell>
            <TableCell>{n.x}</TableCell>
            <TableCell>{n.y}</TableCell>
            <TableCell>{n.building}</TableCell>
            <TableCell>{n.floor}</TableCell>
            <TableCell>{n.type}</TableCell>
            <TableCell>{n.longName}</TableCell>
            <TableCell>{n.shortName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
