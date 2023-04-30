import { z } from "zod";

export const UserSchema = z.object({
	password: z.string(),
	user_email: z.string().email(),
	first_name: z.string(),
	last_name: z.string()
});

export const GoalSchema = z.object({
	goal_id: z.number(),
	user_email: z.string().email(),
	name: z.string(),
	description: z.string(),
	goal_type: z.union([z.literal("major"), z.literal("minor")]),
	schedule: z.string()
});

export const CompletedGoalSchema = z.object({
	user_email: z.string().email(),
	goal_id: z.number(),
	date: z.date()
});
