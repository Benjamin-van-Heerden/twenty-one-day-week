import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import * as GoalSchemas from "./schemas";
import { create_goal, get_goals } from "$lib/server/database";

export async function load({ cookies, request }) {
	const create_form = await superValidate(GoalSchemas.GoalSchema, { id: "createForm" });

	const goals = await get_goals(cookies.get("user_email")!);

	return {
		create_form,
		goals
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		const create_form = await superValidate(request, GoalSchemas.GoalSchema, { id: "createForm" });
		console.log(create_form);
		if (!create_form.valid) return fail(400, { create_form });
		try {
			const goal_create = await create_goal(create_form.data);
		} catch (e) {
			console.log(e);
			return fail(500, { create_form });
		}
	},
	update: async ({ cookies, request }) => {},
	delete: async ({ cookies, request }) => {}
};
