"use client";

import { EntertainmentForm } from "@/components/EntertainmentForm";
import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Entertainments() {
  const { data } = useQuery({
    queryKey: ["entertainments"],
    queryFn: () => {
      return commonService.getAll("entertainments");
    },
  });

  console.log({data})

  const queryClient = useQueryClient();

  const { mutate: deleteById } = useMutation({
    mutationFn: commonService.deletebyId,
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Entertainment deleted successfully.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({
        queryKey: ["entertainments"],
      });
    },
  });

  function handleDelete(id: string) {
    deleteById({ id, resource: "entertainments" });
  }


  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    type: a.type,
    icon: <Badge variant="outline">Entertainment</Badge>,
   actions: [
      {
        component: (
          <EntertainmentForm id={a.id} type="edit" />
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
      caption="List of all entertainments of our app."
      title="Entertainments"
      headers={["id", "name", "description", "type", "actions"]}
      rows={tableData}
      createComponent={<EntertainmentForm />}
    />
  );
}
