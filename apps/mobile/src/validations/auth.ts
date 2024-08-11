import zod from 'zod';

export const SignUpValidationSchema = zod.object({
  first_name: zod
    .string({
      required_error: 'First name must not be empty!',
      invalid_type_error: 'First name is invalid!',
    })
    .trim()

    .min(2, 'First name must not be empty!'),
  last_name: zod.string().trim().optional(),
  email: zod
    .string({
      required_error: 'Email must not be empty!',
      invalid_type_error: 'Email is invalid!',
    })
    .trim()
    .toLowerCase()
    .email('Email is invalid!'),
  password: zod
    .string({
      required_error: 'Password must not be empty!',
      invalid_type_error: 'Password is invalid!',
    })
    .min(6, 'Password must have at least 6 characters!'),
});

export const SignInValidationSchema = SignUpValidationSchema.pick({
  email: true,
  password: true,
});
