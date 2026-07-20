import { Property } from "@/models/Property";
import { listAndCreate } from "@/lib/crud";

export const { GET, POST } = listAndCreate(Property, "isActive");
