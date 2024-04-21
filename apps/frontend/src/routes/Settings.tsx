import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useState } from "react";
import { trpc } from "@/utils/trpc.ts";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { CreateUserDialog } from "@/components/CreateUserDialog.tsx";

export function Settings() {
  const [tableFilter, setTableFilter] = useState("patients");

  const users = trpc.user.getAll.useQuery();

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  if (users.isError) {
    return <div>No users found</div>;
  }

  console.log(users.data);

  return (
    <>
      <Dialog>
        <Tabs value={tableFilter} onValueChange={setTableFilter}>
          <div className="w-full h-full flex flex-col justify-center items-center p-6 gap-2">
            <div className="w-full flex">
              <TabsList>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="admins">Staff</TabsTrigger>
              </TabsList>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1 ml-auto">
                  <PlusIcon className="w-4 h-4" />
                  Create User
                </Button>
              </DialogTrigger>
            </div>
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Create, edit, and view users.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </Tabs>
        <CreateUserDialog />
      </Dialog>
    </>
  );
}
