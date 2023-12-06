type Init<T> = Omit<RequestInit, "body"> & {
  body?: T;
};

export const fetcher = <T extends object>(
  input: RequestInfo | URL,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  return fetch(input, {
    ...restInit,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
