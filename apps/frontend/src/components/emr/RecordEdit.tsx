import { trpc } from "@/utils/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateTime } from "luxon";

export function RecordEdit({ recordId }: { recordId: string }) {
  const [record] = trpc.record.getOne.useSuspenseQuery({
    id: recordId,
  });

  if (!record) {
    return <div>Record not found.</div>;
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Record {record.id}</CardTitle>
        <CardDescription>
          Authored by {record.author.name} on{" "}
          {DateTime.fromJSDate(record.creationTime).toLocaleString(
            DateTime.DATETIME_SHORT,
          )}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
