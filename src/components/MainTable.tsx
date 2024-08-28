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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoveVerticalIcon className="h-5 w-5" />
                                  <span className="sr-only">More actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {row.actions?.map((action, k) => {
                                  return (
                                    <div key={k}>
                                      {k !== 0 ? (
                                        <DropdownMenuSeparator />
                                      ) : null}
                                      {action.component}
                                    </div>
                                  );
                                })}
                              </DropdownMenuContent>
                            </DropdownMenu>
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
          ) : <p className="text-center">No Data Yet!</p>}
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
