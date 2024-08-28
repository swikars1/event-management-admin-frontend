import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commonService } from "@/services/common.service";

type Inputs = {
  name: string;
  description: string;
  address: string;
};

export function AccommodationForm({
  type = "create",
  id,
}: {
  type?: "edit" | "create";
  id?: string;
}) {
  const queryClient = useQueryClient();

  const { data: oneAccommodation } = useQuery({
    queryKey: ["accommodations", id],
    queryFn: () => {
      if (id) {
        return commonService.getOne("accommodations", id);
      }
    },
    enabled: !!id,
  });

  console.log({ oneAccommodation });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: "sdsd",
      description: "sd",
      address: "d",
    },
  });

  const { mutate } = useMutation({
    mutationFn: commonService.create,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["accommodations"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit called");
    mutate({ payload: data, resource: "accommodations" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!id ?<Button variant="outline">+ Create Accommodation</Button> : "asd" }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Accommodation</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new accommodation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Annapurna Resort"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-400 text-sm">Name is required.</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your accommodation..."
              className="min-h-[120px]"
              {...register("description", { required: true })}
            />

            {errors.description && (
              <span className="text-red-400 text-sm">
                Description is required.
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Tulsipur, Dang"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-400 text-sm">Address is required.</span>
            )}
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit">Save Accommodation</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
