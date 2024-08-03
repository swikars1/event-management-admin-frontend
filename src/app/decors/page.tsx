import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";

export default function Decors() {
  return (
    <MainTable
      caption="List of all users of our app."
      title="Decors"
      headers={["ID", "Name", "Email", "Role", "Actions"]}
      rows={[
        ["1", "John Doe", "j@j.com", <Badge variant="outline">User</Badge>],
        ["2", "Jane Doe", "j@j.com", <Badge variant="outline">User</Badge>],
      ]}
    />
  );
}
