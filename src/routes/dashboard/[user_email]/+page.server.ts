import { superValidate } from "sveltekit-superforms/server";
import * as GoalSchemas from "./schemas";

export async function load({ cookies, request }) {
	const create_form = await superValidate(request, GoalSchemas.GoalSchema, { id: "createForm" });
	return {
		create_form
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		console.log(await request.formData());
	},
	delete: async ({ cookies, request }) => {}
};
