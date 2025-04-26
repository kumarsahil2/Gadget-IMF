import { EntitySchema } from "typeorm";

export const Gadget = new EntitySchema({
  name: "Gadget",
  tableName: "gadgets",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    name: {
      type: "varchar"
    },
    status: {
      type: "enum",
      enum: ["Available", "Deployed", "Destroyed", "Decommissioned"],
      default: "Available"
    },
    decommissionedAt: {
      type: "timestamp",
      nullable: true
    }
  }
});
