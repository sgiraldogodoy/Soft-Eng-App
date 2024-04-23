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
import { Route, useLocation } from "wouter";

export function Settings() {
  const [tableFilter, setTableFilter] = useState("all");
  const [, setLocation] = useLocation();

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
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="patient">Patients</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <Button
              onClick={() => {
                setLocation("/create");
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
              <UserTable
                data={
                  tableFilter === "all"
                    ? usersQuery.data
                    : usersQuery.data.filter(
                        (user) => user.role === tableFilter,
                      )
                }
              />
            </CardContent>
          </Card>
        </div>
      </Tabs>
      <Route path="/create" nest>
        <CreateUserDialog open={true} setOpen={() => setLocation("/")} />
      </Route>
    </>
  );
}
