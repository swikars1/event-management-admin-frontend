"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Decors() {
  const { data } = useQuery({
    queryKey: ["decors"],
    queryFn: () => {
      return commonService.getAll("decors");
    },
  });

  const tableData = data?.responseObject?.map((a) => [
    a.id,
    a.name,
    a.description,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all decors of our app."
          title="Decors"
          headers={["ID", "Name", "Description", "Actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
