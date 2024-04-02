import { columns } from "./DTColumns";
import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/utils/trpc";

export default function RequestTable() {
  const servicesQuery = trpc.service.getAllFlowerRequests.useQuery();

  if (servicesQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (servicesQuery.isError) {
    return <p>Error!</p>;
  }

  if (!servicesQuery.data) {
    return <p>No data.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={servicesQuery.data} />
    </div>
  );
}
