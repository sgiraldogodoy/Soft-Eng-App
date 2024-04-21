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
import { CreateUserDialog } from "@/components/CreateUserDialog.tsx";
import { UserTable } from "@/components/UserTable.tsx";
import { LoadingSpinner } from "@/components/ui/loader.tsx";

export function Settings() {
  const [tableFilter, setTableFilter] = useState("patients");
  const [creatingUser, setCreatingUser] = useState(false);

  const usersQuery = trpc.user.getAll.useQuery();

  if (usersQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (usersQuery.isError) {
    return <div>An error occurred.</div>;
  }

  if (!usersQuery.data) {
    return <div>An error occurred.</div>;
  }

  return (
    <>
      <Tabs value={tableFilter} onValueChange={setTableFilter} asChild>
        <div className="w-full h-full flex flex-col justify-center items-center p-6 gap-2">
          <div className="w-full flex">
            <TabsList className="animate-in fade-in zoom-in-105 duration-300">
              <TabsTrigger
                className="animate-in fade-in zoom-in-105 duration-500 delay-100 fill-mode-both"
                value="patients"
              >
                Patients
              </TabsTrigger>
              <TabsTrigger
                className="animate-in fade-in zoom-in-105 duration-500 delay-200 fill-mode-both"
                value="admins"
              >
                Staff
              </TabsTrigger>
            </TabsList>
            <Button
              onClick={() => {
                setCreatingUser(true);
              }}
              size="sm"
              className="gap-1 ml-auto animate-in fade-in zoom-in-105 duration-500 fill-mode-both delay-300"
            >
              <PlusIcon className="w-4 h-4" />
              Create User
            </Button>
          </div>
          <Card className="w-full h-full animate-in fade-in zoom-in-105 duration-500 delay-400">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Create, edit, and view users.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable data={usersQuery.data} />
            </CardContent>
          </Card>
        </div>
      </Tabs>
      <CreateUserDialog open={creatingUser} setOpen={setCreatingUser} />
    </>
  );
}
