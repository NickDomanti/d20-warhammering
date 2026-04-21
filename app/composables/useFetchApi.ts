const useFetchApi: typeof useFetch = (...args) => {
  const fetchData = useFetch(...args);
  watch(fetchData.error, toastFetchError);
  return fetchData;
};

export default useFetchApi;
