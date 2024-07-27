import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(3, "Field cannot be empty"),
  lastName: z.string().min(3, "Field cannot be empty"),
  email: z.string().min(3, "Field cannot be empty").email("Invalid email"),
  password: z
    .string()
    .min(8, "Minimum of 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain one uppercase letter,one lowercase letter, number and one special character "
    ),
});

export { registerSchema };
