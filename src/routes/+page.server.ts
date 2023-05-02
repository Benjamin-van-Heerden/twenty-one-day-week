import { create_user, login_user, verify_session } from "$lib/server/database";
import { superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import * as HomeSchemas from "./schemas";

export async function load({ cookies }) {
	const login_form = await superValidate(HomeSchemas.LoginSchema, { id: "loginForm" });
	const register_form = await superValidate(HomeSchemas.RegisterSchema, { id: "registerForm" });

	// check if the user already has a session
	const session = cookies.get("session");
	const user_email = cookies.get("user_email");

	if (session && user_email) {
		// verify the session
		const verified = await verify_session(session, user_email);

		if (verified) {
			throw redirect(302, `/dashboard/${user_email}`);
		}
	}

	return { login_form, register_form };
}

export const actions = {
	login: async ({ cookies, request }) => {
		const login_form = await superValidate(request, HomeSchemas.LoginSchema, { id: "login_form" });
		if (!login_form.valid) return fail(400, { login_form });

		const login_result = await login_user(login_form.data as any);

		if (login_result === "error") return fail(500, { login_form });

		// otherwise, set the cookie and return a redirect
		cookies.set("session", (login_result as any).jwt);
		cookies.set("user_email", (login_result as any).user_email);
		throw redirect(302, `/dashboard/${(login_result as any).user_email}`);
	},
	register: async ({ cookies, request }) => {
		const register_form = await superValidate(request, HomeSchemas.RegisterSchema, {
			id: "register_form"
		});

		if (!register_form.valid) return fail(400, { register_form });

		const { confirm_password, ...createUserArgs } = register_form.data as any;
		// create user
		const userCreate = await create_user(createUserArgs as any);

		if (userCreate === "error") return fail(500, { register_form });

		return { register_form };
	}
};
