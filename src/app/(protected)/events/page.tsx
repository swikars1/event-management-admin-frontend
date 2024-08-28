"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Events() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      return commonService.getAll("events");
    },
  });
  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Event deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  const { mutate: approve } = useMutation({
    mutationFn: commonService.update,
    onSuccess: () => {
      toast({
        title: "Approved!",
        description: "Event Approved successfully.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  const { mutate: unapprove } = useMutation({
    mutationFn: commonService.update,
    onSuccess: () => {
      toast({
        title: "Unapproved!",
        description: "Event Unapproved successfully.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "events" });
  }

  function handleApprove(id: string) {
    approve({id, payload: {status: "SCHEDULED"}, resource: "events"});
  }

  function handleUnapprove(id: string) {
    unapprove({id, payload: {status: "DRAFT"}, resource: "events"});
  }

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    startDate: a.startDate,
    endDate: a.endDate,
    location: a.location,
    icon: <Badge variant="outline">Event</Badge>,
    actions: [
      {
        component: (
          <Button variant={a.status === "DRAFT" ? "secondary" : "outline"} onClick={() => {
            if (a.status === "DRAFT") {
              handleApprove(a.id)
            } else {
              handleUnapprove(a.id)
            }
          }}>
            {a.status === "DRAFT" ? "Approve" : "Unapprove"}
          </Button>
        ),
      },
      {
        component: (
          <Button variant="destructive" onClick={() => handleDelete(a.id)}>
            Delete
          </Button>
        ),
      },
    ],
  }));

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all events of our app."
          title="Events"
          headers={[
            "title",
            "description",
            "startDate",
            "endDate",
            "location",
            "actions",
          ]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
