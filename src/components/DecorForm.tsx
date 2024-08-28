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
};


export function DecorForm({
  type = "create",
  id,
}: {
  type?: "edit" | "create";
  id?: string;
}) {
  const queryClient = useQueryClient();

  const { data: oneDecor } = useQuery({
    queryKey: ["decors", id],
    queryFn: () => {
      if (id) {
        return commonService.getOne("decors", id);
      }
    },
    enabled: !!id,
  });

  console.log({ oneDecor });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
    },
    values: oneDecor?.responseObject,
  });

  const { mutate: create } = useMutation({
    mutationFn: commonService.create,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["decors"] });
      reset();
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: commonService.update,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["decors"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit called");
    if (id) {
      update({ payload: data, resource: "decors", id });
    } else {
      create({ payload: data, resource: "decors" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!id ? (
          <Button variant="outline">+ Create Decor</Button>
        ) : (
          <Button variant="outline">Edit</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{id ? "Edit Decor" : "Create New Decor"}</DialogTitle>
          <DialogDescription>
          Fill out the form below and press save.
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
