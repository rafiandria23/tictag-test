import zod from 'zod';
import validator from 'validator';

export const CreateWarrantyClaimValidationSchema = zod.object({
  name: zod
    .string({
      required_error: 'Name must not be empty!',
      invalid_type_error: 'Name is invalid!',
    })
    .trim()
    .min(2, 'Name must not be empty!'),
  description: zod
    .string({
      required_error: 'Description must not be empty!',
      invalid_type_error: 'Description is invalid!',
    })
    .trim()
    .min(2, 'Description is invalid!'),
  product: zod
    .string({
      required_error: 'Product must not be empty!',
      invalid_type_error: 'Product is invalid!',
    })
    .trim()
    .refine((value?: string) => {
      if (!value) {
        return false;
      }

      return validator.isMongoId(value);
    }, 'Product is invalid!'),
});
