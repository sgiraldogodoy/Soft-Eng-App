import { ExampleComponent } from "@/components/ExampleComponent.tsx";
import { trpc } from "../utils/trpc.ts";

export default function ExampleRoute() {
  const mutation = trpc.service.createFlowerRequest.useMutation();

  const flowerRequest = {
    serviceId: "CCONF001L1",
    flower: "Rose",
    recipientName: "John Doe",
  };

  const handleCreateFlowerRequest = () => {
    mutation.mutate(flowerRequest, {
      onSuccess: (data) => {
        console.log("Flower request created successfully", data);
      },
      onError: (error) => {
        console.error("Error creating flower request", error);
      },
    });
  };

  const checkFlowerRequest = () => {
    return trpc.service.getFlowerRequest.useQuery({ id: "Node1" });
  };

  return (
    <div className="w-100">
      <h1>This is an example page.</h1>
      <p>{mutation.data?.message ?? "loading"}</p>
      <ExampleComponent></ExampleComponent>
      <button onClick={handleCreateFlowerRequest}>Create Flower Request</button>
      <br />
      <button onClick={checkFlowerRequest}>Check Flower Request</button>
    </div>
  );
}
