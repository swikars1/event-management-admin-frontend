"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Themes() {
  const { data } = useQuery({
    queryKey: ["themes"],
    queryFn: () => {
      return commonService.getAll("themes");
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
          caption="List of all themes of our app."
          title="Themes"
          headers={["ID", "Name", "Description", "Actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
