import type { FetchError } from 'ofetch';

export default async function fetchApi<T>(
  ...params: Parameters<typeof $fetch>
) {
  try {
    const data = await $fetch<T>(...params);

    return {
      success: true,
      data,
    };
  } catch (error) {
    toastFetchError(error as FetchError);

    return {
      success: false,
      error,
    };
  }
}
