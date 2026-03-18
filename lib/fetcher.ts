export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // 👉 gọi qua FE API (proxy)
  let res = await fetch("/api/proxy" + url, {
    ...options,
  });

  // 👉 nếu hết hạn token
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
    });

    if (!refreshRes.ok) {
      // 👉 logout
      window.location.href = "/login";
      return;
    }

    // 👉 gọi lại request
    res = await fetch("/api/proxy" + url, {
      ...options,
    });
  }

  // 👉 tránh crash nếu không phải JSON
  try {
    return await res.json();
  } catch (error) {
    console.error("fetch error", error);
    return null;
  }
}
