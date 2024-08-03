"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Entertainments() {
  const { data } = useQuery({
    queryKey: ["entertainments"],
    queryFn: () => {
      return commonService.getAll("entertainments");
    },
  });

  const tableData = data?.responseObject?.map((a) => [
    a.id,
    a.name,
    a.description,
    a.type,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all entertainments of our app."
          title="Entertainments"
          headers={["ID", "Name", "Description", "Type", "Actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
