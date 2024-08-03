"use client";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

const EmailLogin = () => {
  // react hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm = async (data) => {
    // console.log("data: " + JSON.stringify(data));
    try {
      await signIn("email", {
        email: data.email
      })
    } catch (error) {
      console.log("error: " + JSON.stringify(error?.message));
    }
  };

  return (
    <div className="p-10 bg-white text-black">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-5"
      >
         <Input
          type="email"
          label="Email"
          placeholder="hello@example.com"
          {...register("email", {
            required: "Correo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Formato de correo inválido",
            },
          })}
          error={errors.email?.message}
        />

        <Button type="submit" disabled={!isDirty || !isValid}>
          Login with email
        </Button>
      </form>
    </div>
  );
};

export default EmailLogin;
