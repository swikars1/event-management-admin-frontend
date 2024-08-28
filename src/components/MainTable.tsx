"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

export function MainTable({
  title,
  caption,
  headers,
  rows,
  createComponent,
}: {
  title: string;
  caption: string;
  headers: string[];
  rows: any[];
  createComponent?: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        {createComponent}
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{caption}</CardDescription>
        </CardHeader>
        <CardContent>
          {rows?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead className="capitalize" key={header}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {headers.map((header, j) => {
                      if (header === "actions") {
                        return (
                          <TableCell
                            key={`${row[header]?.toString()}-${i}-${j}`}
                          >
                            <div className="flex gap-2" >
                              {row.actions?.map((action, k) => {
                                return (
                                  <div key={k}>
                                    {action.component}
                                  </div>
                                );
                              })}
                            </div>
                          </TableCell>
                        );
                      }
                      if (header === 'role') {
                        return (
                          <TableCell key={`${row[header]?.toString()}-${i}-${j}`}>
                            <Badge variant={row[header] === 'ADMIN' ? 'default' : 'secondary'}>{row[header]}</Badge>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={`${row[header]?.toString()}-${i}-${j}`}>
                          {row[header]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center">No Data Yet!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
