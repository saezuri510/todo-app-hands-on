type Init<T> = Omit<RequestInit, "body"> & {
  body?: T;
};

export const fetcher = async <T extends object>(
  input: RequestInfo | URL,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  const res = await fetch(input, {
    ...restInit,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  return data;
};
