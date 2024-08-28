"use client";

import { AccommodationForm } from "@/components/AccommodationForm";
import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { commonService } from "@/services/common.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Accommodations() {
  const [editOpen, setEditOpen] = useState();

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


  const tableData = data?.responseObject?.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    address: a.address,
    icon: <Badge variant="outline">Accommodation</Badge>,
    actions: [
      {
        component: (
          <AccommodationForm id={a.id} type="edit" />
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
      caption="List of all accommodations of our app."
      title="Accommodations"
      headers={["id", "name", "description", "address", "actions"]}
      rows={tableData}
      createComponent={<AccommodationForm />}
    />
  );
}
