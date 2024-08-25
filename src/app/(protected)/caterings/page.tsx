"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Caterings() {
  const { data } = useQuery({
    queryKey: ["caterings"],
    queryFn: () => {
      return commonService.getAll("caterings");
    },
  });

  const tableData = data?.responseObject?.map((a) => [
    a.id,
    a.name,
    a.description,
    a.menu,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all caterings of our app."
          title="Caterings"
          headers={["ID", "Name", "Description", "Menu", "Actions"]}
          rows={tableData}
        />
      ) : (
        <p>No Caterings</p>
      )}
    </>
  );
}
