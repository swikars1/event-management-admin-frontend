"use client";

import { MainTable } from "./MainTable";
import { Badge } from "./ui/badge";

export default function MainPage() {
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
