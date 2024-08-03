"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Events() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      return commonService.getAll("events");
    },
  });
  const tableData = data?.responseObject?.map((a) => [
    a.title,
    a.description,
    a.startDate,
    a.endDate,
    a.location,
  ]);

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all events of our app."
          title="Events"
          headers={[
            "Title",
            "Description",
            "Start Date",
            "End Date",
            "Location",
            "Actions",
          ]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
