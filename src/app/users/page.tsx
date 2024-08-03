"use client";
import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";
import { commonService } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      commonService.getAll("users");
    },
  });
  return (
    <MainTable
      caption="List of all users of our app."
      title="Users"
      headers={["ID", "Name", "Email", "Role", "Actions"]}
      rows={[
        ["1", "John Doe", "j@j.com", <Badge variant="outline">User</Badge>],
        ["2", "Jane Doe", "j@j.com", <Badge variant="outline">User</Badge>],
      ]}
    />
  );
}
