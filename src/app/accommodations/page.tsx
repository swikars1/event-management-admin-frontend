"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Accommodations() {
  const { data } = useQuery({
    queryKey: ["accommodations"],
    queryFn: () => {
      return commonService.getAll("accommodations");
    },
  });

  const tableData = data?.responseObject?.map((a) => [
    a.id,
    a.name,
    a.description,
    a.address,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all accommodations of our app."
          title="Accommodations"
          headers={["ID", "Name", "Description", "Address", "Actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
