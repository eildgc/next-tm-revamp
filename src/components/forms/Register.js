"use client";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";

const Register = () => {
  // react hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
 
  const handleSubmitForm = async (data) => {
    // console.log("data: " + JSON.stringify(data));
    try {
      const response = await axios.post("/api/users/register", data);

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
          type="text"
          label="Tu nombre completo"
          placeholder="John doe"
          {...register("name", {
            required: "El nombre es requerido",
          })}
          error={errors.name?.message}
        />

        <Input
          type="email"
          label="Email"
          placeholder="hello@example.com"
          {...register("email", {
            required: "Correo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address format",
            },
          })}
          error={errors.email?.message}
        />

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
          Regístrarse
        </Button>
      </form>
    </div>
  );
};

export default Register;
