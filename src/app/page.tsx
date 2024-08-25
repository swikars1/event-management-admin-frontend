"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { push } = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [token] = useLocalStorage({ key: "token", initialValue: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!token) {
      push("/signin");
    } else {
      push("/users");
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return commonService.getAll("users");
    },
  });

  const tableData = data?.responseObject?.map((a) => [
    a.id,
    a.name,
    a.email,
    <Badge variant="outline">User</Badge>,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all users of our app."
          title="Users"
          headers={["ID", "Name", "Email", "Role", "Actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
