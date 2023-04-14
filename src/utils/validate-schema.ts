import { ZodSchema } from 'zod';

/**
 * A function that validates a schema and returns the data if it matches the schema.
 *
 * If the environment is not development, the data is returned as-is for performance reasons.
 */
const validateSchema = <T>(schema: ZodSchema, data: unknown): T => {
  if (process.env.NODE_ENV === 'development') {
    return schema.parse(data);
  }

  return data as T;
};

export default validateSchema;
