import type { H3Event } from 'h3';
import * as v from 'valibot';

export async function validateBody<TSchema extends v.GenericSchema>(
  event: H3Event,
  schema: TSchema,
): Promise<v.InferOutput<TSchema>> {
  const body = await readBody(event);
  const result = v.safeParse(schema, body);

  if (!result.success) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: v.summarize(result.issues),
    });
  }

  return result.output;
}
