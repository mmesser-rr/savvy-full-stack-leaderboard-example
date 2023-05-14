export const fetcher = (url: string) => fetch(
  process.env.REACT_APP_BACKEND_ENDPOINT + url
).then((res) => res.json());
