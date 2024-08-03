"use client";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verify = searchParams.get("verified");
  const router = useRouter();

  // console.log("token", token);
  // console.log("verify", verify);

  useEffect(() => {
    if (!token || verify !== "true") {
      router.push("/");
    }
  }, [token, verify, router]);



  // react hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      password: "",
      token: "",

    },
  });
 
  const handleSubmitForm = async (data) => {
    // console.log("data: " + JSON.stringify(data));
    try {
      data.token = token;
      const response = await axios.post("/api/users/reset-password", data);

      console.log("response", response);
    } catch (error) {
      console.log("error", error?.message);
    }
  };

  return (
    <div className="p-10 bg-white">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-5"
      >
        <Input
          type="password"
          label="Password"
          placeholder="*****"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />

        <Button disabled={!isDirty || !isValid} type="submit">
          Reset password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
