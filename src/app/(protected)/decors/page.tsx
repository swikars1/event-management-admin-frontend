"use client";

import { DecorForm } from "@/components/DecorForm";
import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Decors() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["decors"],
    queryFn: () => {
      return commonService.getAll("decors");
    },
  });

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Decors deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["decors"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "decors" });
  }


  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    icon: <Badge variant="outline">Decor</Badge>,
    actions: [
      {
        component: (
          <DecorForm id={a.id} type="edit" />
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
    <MainTable
      caption="List of all decors of our app."
      title="Decors"
      headers={["id", "name", "description", "actions"]}
      rows={tableData}
      createComponent={<DecorForm />}
    />
  );
}
