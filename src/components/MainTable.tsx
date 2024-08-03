"use client";
import Link from "next/link";
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
}: {
  title: string;
  caption: string;
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{caption}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell) => (
                    <TableCell key={cell?.toString()}>{cell}</TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveVerticalIcon className="h-5 w-5" />
                          <span className="sr-only">More actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                {rows.map((row, i) => (
                  <TableCell key={i}>{row.value}</TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Headphones</div>
                      <div className="text-sm text-muted-foreground">
                        Wireless Bluetooth
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>AHD-001</TableCell>
                <TableCell>$99.99</TableCell>
                <TableCell>
                  <Badge variant="outline">In Stock</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-5 w-5" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Smartwatch</div>
                      <div className="text-sm text-muted-foreground">
                        Fitness Tracking
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>ASW-002</TableCell>
                <TableCell>$199.99</TableCell>
                <TableCell>
                  <Badge variant="outline">In Stock</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-5 w-5" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Laptop Stand</div>
                      <div className="text-sm text-muted-foreground">
                        Ergonomic Design
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>ALS-003</TableCell>
                <TableCell>$49.99</TableCell>
                <TableCell>
                  <Badge variant="outline">Low Stock</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-5 w-5" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Wireless Keyboard</div>
                      <div className="text-sm text-muted-foreground">
                        Rechargeable
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>AWK-004</TableCell>
                <TableCell>$79.99</TableCell>
                <TableCell>
                  <Badge variant="outline">In Stock</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-5 w-5" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
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
