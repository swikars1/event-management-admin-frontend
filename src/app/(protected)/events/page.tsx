"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  function handleShow(id: string) {}

  function handleApprove(id: string) {
    approve({ id, payload: { status: "SCHEDULED" }, resource: "events" });
  }

  function handleUnapprove(id: string) {
    unapprove({ id, payload: { status: "DRAFT" }, resource: "events" });
  }

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    startDate: new Date(a.startDate).toLocaleDateString(),
    endDate: new Date(a.endDate).toLocaleDateString(),
    location: a.location,
    icon: <Badge variant="outline">Event</Badge>,
    actions: [
      {
        component: (
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription className="space-y-2">
                  <div className="mt-3">
                    <span className="font-bold">Event Title:</span> {a.title}
                  </div>
                  <div>
                    <span className="font-bold">Event Description:</span>{" "}
                    {a.description}
                  </div>
                  <div>
                    <span className="font-bold">Booked by:</span>{" "}
                    {`${a.organizer.name} (${a.organizer.email})`}
                  </div>
                  <div>
                    <span className="font-bold"> Start Date:</span>{" "}
                    {new Date(a.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-bold"> End Date:</span>{" "}
                    {new Date(a.endDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-bold">Location:</span> {a.location}
                  </div>
                  <div>
                    <span className="font-bold">Accommodation: </span>{" "}
                    {a.accommodation?.name}
                  </div>

                  <div>
                    <span className="font-bold">Entertainment:</span>{" "}
                    {a.entertainment?.name}
                  </div>
                  <div>
                    <span className="font-bold">Catering:</span>{" "}
                    {a.catering?.name}
                  </div>
                  <div>
                    <span className="font-bold">Theme:</span> {a.theme?.name}
                  </div>
                  <div>
                    <span className="font-bold">Decor:</span> {a.decor?.name}
                  </div>
                  <div>
                    <span className="font-bold">Status:</span> {a.status}
                  </div>
                  <div>
                    <span className="font-bold">Booked At:</span>{" "}
                    {new Date(a.createdAt).toLocaleDateString()}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ),
      },
      {
        component: (
          <Button
            variant={a.status === "DRAFT" ? "secondary" : "outline"}
            onClick={() => {
              if (a.status === "DRAFT") {
                handleApprove(a.id);
              } else {
                handleUnapprove(a.id);
              }
            }}
          >
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
