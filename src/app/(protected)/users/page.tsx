"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
