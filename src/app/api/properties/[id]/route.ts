import { Property } from "@/models/Property";
import { getUpdateDelete } from "@/lib/crud";

export const { GET, PUT, DELETE } = getUpdateDelete(Property);
