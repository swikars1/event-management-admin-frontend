import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";

export function AdminPage() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="bg-background border-r border-muted-foreground/10 hidden md:flex flex-col items-start justify-between py-6 px-4 gap-4">
        <div className="flex flex-col items-start gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <CalendarIcon className="w-6 h-6" />
            <span className="sr-only">Event Management</span>
          </Link>
          <nav className="flex flex-col items-start gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <UsersIcon className="w-5 h-5" />
              User Management
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-5 h-5" />
              Event Scheduling
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <ClipboardIcon className="w-5 h-5" />
              Event Planning
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <SearchIcon className="w-5 h-5" />
              Search
            </Link>
          </nav>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SettingsIcon className="w-5 h-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-background border-b border-muted-foreground/10 sticky top-0 z-10 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="w-5 h-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    <CalendarIcon className="w-6 h-6" />
                    <span>Event Management</span>
                  </Link>
                  <nav className="grid gap-2">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <UsersIcon className="w-5 h-5" />
                      User Management
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <CalendarIcon className="w-5 h-5" />
                      Event Scheduling
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <ClipboardIcon className="w-5 h-5" />
                      Event Planning
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <SearchIcon className="w-5 h-5" />
                      Search
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>User Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="relative flex-1 max-w-md md:ml-auto">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users, events, and more..."
              className="pl-8 w-full"
            />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage registered users, their roles, and access
                  levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">John Doe</div>
                      </TableCell>
                      <TableCell>john.doe@example.com</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Admin</Badge>
                      </TableCell>
                      <TableCell>Full Access</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Jane Smith</div>
                      </TableCell>
                      <TableCell>jane.smith@example.com</TableCell>
                      <TableCell>
                        <Badge variant="outline">Moderator</Badge>
                      </TableCell>
                      <TableCell>Limited Access</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Bob Johnson</div>
                      </TableCell>
                      <TableCell>bob.johnson@example.com</TableCell>
                      <TableCell>
                        <Badge variant="outline">User</Badge>
                      </TableCell>
                      <TableCell>Read-only</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>Add User</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Event Scheduling</CardTitle>
                <CardDescription>
                  View and manage upcoming events, including available dates and
                  times.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="month"
                  className="p-0 [&_td]:w-10 [&_td]:h-10 [&_th]:w-10 [&_[name=day]]:w-10 [&_[name=day]]:h-10 [&>div]:space-x-0 [&>div]:gap-6"
                />
              </CardContent>
              <CardFooter>
                <Button>Create Event</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Event Planning</CardTitle>
                <CardDescription>
                  Manage event details like themes, decor, catering,
                  entertainment, and accommodations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Themes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Elegant Garden</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Modern Minimalist</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Rustic Chic</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Theme</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Decor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Floral Arrangements</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Lighting Fixtures</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Furniture Rentals</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Decor</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Catering</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Gourmet Catering</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Vegetarian Options</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Dessert Bar</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Catering</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Entertainment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Live Music</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Photo Booth</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Magician</div>
                          <Button size="icon" variant="ghost">
                            <FilePenIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Entertainment</Button>
                    </CardFooter>
                  </Card>
                  <Card />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
