"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
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
