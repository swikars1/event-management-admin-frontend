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

export default function Users() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return commonService.getAll("users");
    },
  });

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "User deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "users" });
  }

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    role: a.role,
    icon: <Badge variant="outline">User</Badge>,
    actions: [
      {
        component: (
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Bookings</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <>
                  {a?.events?.length ? (
                    a?.events?.map((e) => {
                      return (
                        <DialogDescription className="space-y-2">
                          <div className="mt-3">
                            <span className="font-bold">Event Title:</span>{" "}
                            {e?.title}
                          </div>
                          <div>
                            <span className="font-bold">
                              Event Description:
                            </span>{" "}
                            {e?.description}
                          </div>
                          <div>
                            <span className="font-bold"> Start Date:</span>{" "}
                            {new Date(e?.startDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-bold"> End Date:</span>{" "}
                            {new Date(e?.endDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-bold">Location:</span>{" "}
                            {e?.location}
                          </div>
                          <div>
                            <span className="font-bold">Accommodation: </span>{" "}
                            {e?.accommodation?.name}
                          </div>

                          <div>
                            <span className="font-bold">Entertainment:</span>{" "}
                            {e?.entertainment?.name}
                          </div>
                          <div>
                            <span className="font-bold">Catering:</span>{" "}
                            {e?.catering?.name}
                          </div>
                          <div>
                            <span className="font-bold">Theme:</span>{" "}
                            {e?.theme?.name}
                          </div>
                          <div>
                            <span className="font-bold">Decor:</span>{" "}
                            {e?.decor?.name}
                          </div>
                          <div>
                            <span className="font-bold">Status:</span>{" "}
                            {e?.status}
                          </div>
                          <div>
                            <span className="font-bold">Booked At:</span>{" "}
                            {new Date(e?.createdAt).toLocaleDateString()}
                          </div>
                        </DialogDescription>
                      );
                    })
                  ) : (
                    <p className="text-center font-bold text-lg">
                      No events booked yet!
                    </p>
                  )}
                </>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
        <>
          <MainTable
            caption="List of all users of our app."
            title="Users"
            headers={["id", "name", "email", "role", "actions"]}
            rows={tableData}
          />
        </>
      ) : null}
    </>
  );
}
