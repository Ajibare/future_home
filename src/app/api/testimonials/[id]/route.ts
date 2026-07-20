import { Testimonial } from "@/models/Testimonial";
import { getUpdateDelete } from "@/lib/crud";

export const { GET, PUT, DELETE } = getUpdateDelete(Testimonial);
