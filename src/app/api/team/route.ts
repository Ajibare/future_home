import { TeamMember } from "@/models/TeamMember";
import { listAndCreate } from "@/lib/crud";

export const { GET, POST } = listAndCreate(TeamMember, "isActive");
