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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commonService } from "@/services/common.service";

type Inputs = {
  name: string;
  description: string;
};

export function CreateDecor() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const { mutate } = useMutation({
    mutationFn: commonService.create,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["decors"] });
      reset()
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit called");
    mutate({ payload: data, resource: "decors" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Create Decor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Decor</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new decor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Everest Decor"
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
              placeholder="Describe your decor..."
              className="min-h-[120px]"
              {...register("description", { required: true })}
            />

            {errors.description && (
              <span className="text-red-400 text-sm">
                Description is required.
              </span>
            )}
          </div>
          <DialogFooter>
            <DialogClose>

            <Button type="submit">Save Decor</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
