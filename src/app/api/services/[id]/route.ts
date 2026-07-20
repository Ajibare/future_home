import { Service } from "@/models/Service";
import { getUpdateDelete } from "@/lib/crud";

export const { GET, PUT, DELETE } = getUpdateDelete(Service);
