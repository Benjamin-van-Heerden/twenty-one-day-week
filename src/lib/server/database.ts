import { connect } from "@planetscale/database";
import argon2 from "argon2";
import type { z } from "zod";
import jwt from "jsonwebtoken";

import { PSCALE_CONNECTION_STRING, JWT_SEED } from "$env/static/private";
import type * as models from "./models";

type SessionInfo = {
	jwt: string;
	user_email: string;
};

const conn = connect({ url: PSCALE_CONNECTION_STRING });

export async function create_user(
	user: z.infer<typeof models.UserSchema>
): Promise<string | SessionInfo> {
	try {
		// hash the password
		console.log("here1");
		let hashed_password = await argon2.hash(user.password);
		console.log(hashed_password);
		// insert the user into the database
		await conn.execute(
			"insert into twenty_one_user (password, user_email, first_name, last_name) values (?, ?, ?, ?);",
			[hashed_password, user.user_email, user.first_name, user.last_name]
		);
		console.log("here2");
		return {
			jwt: jwt.sign({ user_email: user.user_email }, JWT_SEED),
			user_email: user.user_email
		};
	} catch {
		return "error";
	}
}

export async function login_user(
	user: z.infer<typeof models.UserSchema>
): Promise<string | SessionInfo> {
	// verify a user and handle errors - return a json web token if successful
	try {
		// get the user from the database
		let user_result = await conn.execute("select * from twenty_one_user where user_email = ?;", [
			user.user_email
		]);
		let rows = user_result.rows;
		// check if the user exists
		if (rows.length === 0) {
			return "error";
		}
		// verify the password
		console.log("verifying password");
		if (await argon2.verify((rows[0] as any).password, user.password)) {
			// create a json web token
			return {
				jwt: jwt.sign({ user_email: user.user_email }, JWT_SEED),
				user_email: user.user_email
			};
		} else {
			return "error";
		}
	} catch {
		return "error";
	}
}

// export async function verifySession(token: string, userEmail: string): Promise<boolean> {
//     // decode the json web token
//     try {
//         let decoded = jwt.verify(token, JWT_SEED) as { userEmail: string };
//         // check if the user email matches
//         if (decoded.userEmail === userEmail) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// }
