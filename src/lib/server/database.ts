import { drizzle } from "drizzle-orm/planetscale-serverless";
import { eq } from "drizzle-orm";
import { connect } from "@planetscale/database";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import {
	DATABASE_HOST_PROD,
	DATABASE_USERNAME_PROD,
	DATABASE_PASSWORD_PROD,
	DATABASE_HOST_DEV,
	DATABASE_USERNAME_DEV,
	DATABASE_PASSWORD_DEV,
	VERCEL_ENV,
	JWT_SEED
} from "$env/static/private";
import type * as schemaTypes from "../db/schema";
import * as schemaModels from "../db/schema";
import type { GoalSchema } from "../../routes/dashboard/[user_email]/schemas";

type SessionInfo = {
	jwt: string;
	user_email: string;
};

const connection = connect({
	host: VERCEL_ENV === "development" ? DATABASE_HOST_DEV : DATABASE_HOST_PROD,
	username: VERCEL_ENV === "development" ? DATABASE_USERNAME_DEV : DATABASE_USERNAME_PROD,
	password: VERCEL_ENV === "development" ? DATABASE_PASSWORD_DEV : DATABASE_PASSWORD_PROD
});

const db = drizzle(connection);

export async function create_user(user: schemaTypes.User): Promise<string | SessionInfo> {
	try {
		// hash the password
		let hashed_password = await argon2.hash(user.password!);
		user.password = hashed_password;
		await db.insert(schemaModels.user).values(user);
		return {
			jwt: jwt.sign({ user_email: user.user_email }, JWT_SEED),
			user_email: user.user_email!
		};
	} catch (e) {
		return "error";
	}
}

export async function login_user(user: Partial<schemaTypes.User>): Promise<string | SessionInfo> {
	// verify a user and handle errors - return a json web token if successful
	try {
		// get the user from the database
		let user_result = await db
			.select()
			.from(schemaModels.user)
			.where(eq(schemaModels.user.user_email, user.user_email!));

		// check if the user exists
		if (user_result.length === 0) {
			return "error";
		}
		// verify the password
		if (await argon2.verify(user_result[0].password!, user.password!)) {
			// create a json web token
			return {
				jwt: jwt.sign({ user_email: user.user_email }, JWT_SEED),
				user_email: user.user_email!
			};
		} else {
			return "error";
		}
	} catch (e) {
		console.log(e);
		return "error";
	}
}

export async function verify_session(token: string, user_email: string): Promise<boolean> {
	try {
		let decoded = jwt.verify(token, JWT_SEED) as { user_email: string };
		// check if the user email matches
		if (decoded.user_email === user_email) {
			return true;
		}
		return false;
	} catch {
		return false;
	}
}

export async function create_goal(goal: GoalSchema) {
	try {
		const insert_goal = {
			user_email: goal.user_email,
			description: goal.description,
			goal_type: goal.goal_type as any,
			time_of_day: goal.time_of_day as any,
			schedule: goal.schedule.join(","),
			start_date: new Date(goal.start_date)
		};
		await db.insert(schemaModels.goal).values(insert_goal);
		return "success";
	} catch (e) {
		console.log(e);
		return "error";
	}
}

export async function get_goals(user_email: string) {
	try {
		let goals = await db
			.select()
			.from(schemaModels.goal)
			.where(eq(schemaModels.goal.user_email, user_email));
		return goals;
	} catch (e) {
		console.log(e);
		return "error";
	}
}
