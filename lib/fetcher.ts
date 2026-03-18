export const apiFetch = async (url: string, options: RequestInit = {}) => {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
};
