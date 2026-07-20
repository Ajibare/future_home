import { Testimonial } from "@/models/Testimonial";
import { listAndCreate } from "@/lib/crud";

export const { GET, POST } = listAndCreate(Testimonial, "isActive");
