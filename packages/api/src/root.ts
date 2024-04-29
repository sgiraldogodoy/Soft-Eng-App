import { avRequestRouter } from "./routes/services/avRouter.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";
import { SecurityRouter } from "./routes/services/securityRouter.ts";
import { FlowerRouter } from "./routes/services/flowerRouter.ts";
import { GiftRouter } from "./routes/services/giftRouter.ts";
import { serviceRouter } from "./routes/serviceRouter.ts";
import { maintenanceRequestRouter } from "./routes/services/maintenanceRouter.ts";
import { transportRequestRouter } from "./routes/services/transportRouter.ts";
import { sanitationRequestRouter } from "./routes/services/sanitationRouter.ts";
import { visitorRequestRouter } from "./routes/services/visitorRouter.ts";
import { itRequestRouter } from "./routes/services/itRouter.ts";
import { religiousRequestRouter } from "./routes/services/religiousRouter.ts";
import { InterpreterRouter } from "./routes/services/interpreterRouter.ts";
import { RoomRouter } from "./routes/services/roomRouter.ts";
import { userRouter } from "./routes/users/user.ts";
import { patient } from "./routes/users/patient.ts";
import { staffRouter } from "./routes/users/staff.ts";
import { appointmentRouter } from "./routes/appointments/appointment.ts";
import { visitRouter } from "./routes/appointments/visit.ts";
import { EquipmentRouter } from "./routes/services/equipmentRouter.ts";
import { FoodRouter } from "./routes/services/foodRouter.ts";
import { rfidRouter } from "./routes/users/rfid.ts";

export const appRouter = router({
  //user routers
  user: userRouter,
  patient: patient,
  staff: staffRouter,
  rfid: rfidRouter,

  //service routers
  service: serviceRouter,
  security: SecurityRouter,
  av: avRequestRouter,
  gift: GiftRouter,
  flower: FlowerRouter,
  maintenance: maintenanceRequestRouter,
  transport: transportRequestRouter,
  sanitation: sanitationRequestRouter,
  visitor: visitorRequestRouter,
  it: itRequestRouter,
  religious: religiousRequestRouter,
  interpreter: InterpreterRouter,
  room: RoomRouter,
  equipment: EquipmentRouter,
  food: FoodRouter,

  //appointment routers
  appointment: appointmentRouter,
  visit: visitRouter,
  //visitNote: visitNoteRouter,

  //node and edge routers
  node: Node,
  edge: Edge,
});

export type AppRouter = typeof appRouter;
