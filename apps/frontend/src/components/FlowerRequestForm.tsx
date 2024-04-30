// import { ButtonExample } from "@/components/ui/button.tsx";
// import React from "react";
// import type { FlowerFormFields } from "@/routes/FlowerRequest.tsx";
//
// export default function FlowerRequestForm({
//   flowerState,
//   setFlowerState,
//   handleSubmit,
// }: {
//   flowerState: FlowerFormFields;
//   setFlowerState: React.Dispatch<React.SetStateAction<FlowerFormFields>>;
//   handleSubmit: (event: React.FormEvent) => void;
// }) {
//   const handleNameChange = (event: { target: { value: string } }) => {
//     setFlowerState({ ...flowerState, name: event.target.value });
//   };
//
//   const handleRoomNumberChange = (event: { target: { value: string } }) => {
//     setFlowerState({ ...flowerState, roomNumber: event.target.value });
//   };
//
//   const handleMessageChange = (event: { target: { value: string } }) => {
//     setFlowerState({ ...flowerState, message: event.target.value });
//   };
//
//   return (
//     <div className="flex flex-col py-10 space-y-6 outline-transparent">
//       <form onSubmit={handleSubmit}>
//         <label>
//           <p className="text-md">Name: </p>
//           <input
//             type="text"
//             name="name"
//             value={flowerState.name}
//             onChange={handleNameChange}
//             required
//             className="outline rounded w-80"
//           />
//         </label>
//         <label>
//           <p className="text-md">Room Number: </p>
//           <input
//             type="text"
//             name="roomnumber"
//             value={flowerState.roomNumber}
//             onChange={handleRoomNumberChange}
//             required
//             className="outline rounded w-80"
//           />
//         </label>
//         <label>
//           <p className="text-md">Message: </p>
//           <textarea
//             name="message"
//             className="outline rounded w-80"
//             value={flowerState.message}
//             onChange={handleMessageChange}
//           />
//           <p className="text-sm text-gray-400">
//             Enter your message to the patient here
//           </p>
//         </label>
//         <ButtonExample
//           className="mt-5 w-24 bg-gradient-to-r from-yellow-300 to-yellow-400 text-theme-dark hover:bg-gradient-to-l shadow-lg shadow-theme-yellow/30"
//           disabled={Object.values(flowerState).some((v) => v === "")}
//         >
//           {" "}
//           Submit <input type={"submit"} value={""} />{" "}
//         </ButtonExample>
//       </form>
//     </div>
//   );
// }
