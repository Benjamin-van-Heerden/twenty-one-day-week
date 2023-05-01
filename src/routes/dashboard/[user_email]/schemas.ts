import { z } from "zod";

export const GoalSchema = z.object({
	user_email: z.string().email(),
	time_of_day: z.string().regex(/(morning|afternoon|evening)/),
	description: z.string().min(1).max(100),
	schedule: z.string().regex(/([0-6],?)+/)
});
