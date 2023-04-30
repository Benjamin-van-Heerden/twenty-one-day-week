import { z } from "zod";

export const LoginSchema = z.object({
	user_email: z.string().email(),
	password: z.string().min(8)
	// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
	// 	message: " Invalid Password"
	// })
});

export const RegisterSchema = z.object({
	first_name: z.string().min(2),
	last_name: z.string().min(2),
	user_email: z.string().email(),
	password: z.string().min(8, { message: "" }),
	// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
	// 	message: "One uppercase, lowercase, number, and special character required (min 8 characters)"
	// }),
	confirm_password: z.string().min(8, { message: "" })
	// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
	// 	message: "One uppercase, lowercase, number, and special character required (min 8 characters)"
	// })
});
