import { mysqlTable, serial, varchar, date } from "drizzle-orm/mysql-core";
import type { InferModel } from "drizzle-orm";

export const user = mysqlTable("twenty_one_user", {
	user_email: varchar("user_email", { length: 255 }).primaryKey(),
	first_name: varchar("first_name", { length: 255 }),
	last_name: varchar("last_name", { length: 255 }),
	password: varchar("password", { length: 255 })
});

export type User = InferModel<typeof user>;

export const goal = mysqlTable("twenty_one_goal", {
	id: serial("id").primaryKey(),
	user_email: varchar("user_email", { length: 255 }),
	description: varchar("description", { length: 255 }),
	schedule: varchar("schedule", { length: 255 })
});

export type Goal = InferModel<typeof goal>;

export const completed_goal = mysqlTable("twenty_one_completed_goal", {
	id: serial("id").primaryKey(),
	goal_id: varchar("goal_id", { length: 255 }),
	completed_date: date("completed_date"),
	user_email: varchar("user_email", { length: 255 })
});

export type CompletedGoal = InferModel<typeof completed_goal>;
