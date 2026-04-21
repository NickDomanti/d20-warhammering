import type { FetchError } from 'ofetch';

export default function toastFetchError(
  err?: FetchError<{ message?: string }>,
) {
  if (!err?.data?.message) return;
  useToast().add({ title: err.data?.message, color: 'error' });
}
