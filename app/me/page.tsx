/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LogoutGoogle from "@/components/auth/LogoutGoogle";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

export default function Page() {
  const { data, mutate } = useSWR<any[], any, string>("/me/urls", (url) =>
    fetchWithAuth(url).then((t) => t.urls)
  );

  useEffect(() => {
    if (data) {
      console.log("me:::", data);
    }
  }, [data]);

  return (
    <div>
      <LogoutGoogle />
      <Button
        onClick={async () => {
          await mutate(async (current) => {
            const dataAdd = await fetchWithAuth("/urls", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                originalUrl: "https://movie.flame.id.vn/",
              }),
            });

            return current ? [...current, dataAdd] : [dataAdd];
          }, false);
        }}
      >
        ADD
      </Button>
    </div>
  );
}
