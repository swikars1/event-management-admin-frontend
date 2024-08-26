"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Accommodations() {
  const { data } = useQuery({
    queryKey: ["accommodations"],
    queryFn: () => {
      return commonService.getAll("accommodations");
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Accommodation deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["accommodations"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "accommodations" });
  }

  function handleEdit(id: string) {}

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    address: a.address,
    icon: <Badge variant="outline">Accommodation</Badge>,
    actions: [
      {
        component: (
          <DropdownMenuItem onClick={() => handleEdit(a.id)}>
            Edit
          </DropdownMenuItem>
        ),
      },
      {
        component: (
          <DropdownMenuItem
            onClick={() => handleDelete(a.id)}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        ),
      },
    ],
  }));

  return (
    <>
      {tableData?.length > 0 ? (
        <MainTable
          caption="List of all accommodations of our app."
          title="Accommodations"
          headers={["id", "name", "description", "address", "actions"]}
          rows={tableData}
        />
      ) : null}
    </>
  );
}
