"use client";

import { CreateTheme } from "@/components/CreateTheme";
import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Themes() {
  const { data } = useQuery({
    queryKey: ["themes"],
    queryFn: () => {
      return commonService.getAll("themes");
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Theme deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["themes"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "themes" });
  }

  function handleEdit(id: string) {}

  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    icon: <Badge variant="outline">Theme</Badge>,
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
        <MainTable
          caption="List of all themes of our app."
          title="Themes"
          headers={["id", "name", "description", "actions"]}
          rows={tableData}
          createComponent={<CreateTheme /> }
        />
    </>
  );
}
