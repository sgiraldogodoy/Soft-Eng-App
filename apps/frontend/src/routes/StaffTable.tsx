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
import { LoadingSpinner } from "@/components/ui/loader.tsx";

export function StaffTable() {
  const { data, isLoading, isError } = trpc.staff.getAll.useQuery();

  if (isError) {
    return <p>Error!</p>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Table>
      <TableCaption>Staff</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Staff ID</TableHead>
          <TableHead>Staff Name</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>User ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((n) => (
          <TableRow>
            <TableCell>{n.id}</TableCell>
            <TableCell>{n.name}</TableCell>
            <TableCell>{n.jobTitle}</TableCell>
            <TableCell>{n.userId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
