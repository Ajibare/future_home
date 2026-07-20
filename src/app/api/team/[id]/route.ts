import { TeamMember } from "@/models/TeamMember";
import { getUpdateDelete } from "@/lib/crud";

export const { GET, PUT, DELETE } = getUpdateDelete(TeamMember);
