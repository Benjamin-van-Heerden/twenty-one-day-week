import { z } from "zod";

export const GoalSchema = z.object({
	user_email: z.string().email(),
	time_of_day: z.string().regex(/(morning|afternoon|evening)/),
	start_date: z.string(),
	goal_type: z.string().regex(/(major|minor)/),
	description: z.string().min(1).max(100),
	schedule: z
		.string()
		.regex(/([0-6],?)+/)
		.array()
});

export type GoalSchema = z.infer<typeof GoalSchema>;
