import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

export default function CreateStaffDialog() {
  // const createStaff = trpc.staff.createOne.useMutation();

  return (
    <Dialog open={true}>
      <DialogHeader>Create a Staff</DialogHeader>
      <DialogContent>Test</DialogContent>
    </Dialog>
  );
}
