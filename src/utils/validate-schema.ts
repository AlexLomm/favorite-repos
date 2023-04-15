import { ZodSchema } from 'zod';

/**
 * A function that validates a schema and returns the data if it matches the schema.
 */
const validateSchema = <T>(schema: ZodSchema, data: unknown): T => {
  return schema.parse(data);
};

export default validateSchema;
