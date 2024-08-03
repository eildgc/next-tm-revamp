"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";

const Forget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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
    setIsLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post("/api/users/forget", data);
      setResponseMessage("Password reset email sent successfully!");
      console.log("response", response);
    } catch (error) {
      setResponseMessage("Error: " + (error.response?.data?.message || error.message));
      console.log("Error: ", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-5"
      >
        <Input
          type="email"
          label="Email"
          placeholder="hello@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address format",
            },
          })}
          error={errors.email?.message}
        />
        <Button type="submit" disabled={!isDirty || !isValid || isLoading}>
          {isLoading ? "Sending..." : "Send a reset request"}
        </Button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default Forget;