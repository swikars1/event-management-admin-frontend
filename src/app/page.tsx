import { MainTable } from "@/components/MainTable";
import { Badge } from "@/components/ui/badge";

export default function Home() {
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
