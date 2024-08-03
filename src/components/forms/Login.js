"use client";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

const Login = () => {
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
      email: "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
      console.log("Done");
    } catch (error) {
      console.log("Error: ", error?.message);
    }
    // console.log("data: " + JSON.stringify(data));
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
              message: "El formato del correo es erróneo",
            },
          })}
          error={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="****"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 carácteres",
            },
          })}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={!isDirty || !isValid}>
          Login now
        </Button>
      </form>
    </div>
  );
};

export default Login;
