"use client";

import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Caterings() {
  const { data } = useQuery({
    queryKey: ["caterings"],
    queryFn: () => {
      return commonService.getAll("caterings");
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Catering deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["caterings"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "caterings" });
  }

  function handleEdit(id: string) {}

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    menu: a.menu,
    icon: <Badge variant="outline">Catering</Badge>,
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
          caption="List of all caterings of our app."
          title="Caterings"
          headers={["id", "name", "description", "menu", "actions"]}
          rows={tableData}
        />
      ) : (
        <p>No Caterings</p>
      )}
    </>
  );
}
