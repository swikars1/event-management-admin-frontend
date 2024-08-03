"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useLoginState } from "@/lib/useLoginState";
import { useUserStore } from "../../store/user.store";

export function LoginPage() {
  const [token, setToken] = useLocalStorage({ key: "token", initialValue: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate } = useMutation({
    mutationFn: userService.login,
    mutationKey: ["loginMutation"],
    onSuccess: (res) => {
      setToken(res?.responseObject?.bearerToken || "");
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">Email is required.</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-400 text-sm">
                  Password is required.
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

type Inputs = {
  email: string;
  password: string;
};
