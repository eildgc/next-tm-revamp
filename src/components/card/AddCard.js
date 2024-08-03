'use client';
import axios from "axios";
import Button from "../button/Button";
import Input from "../forms/Input";
import { useForm } from "react-hook-form";

export default function AddCard({ onCardAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post("/api/cards/create", {
        title: data.title,
        content: data.content,
      });
      onCardAdded(response.data.card);
      // Reset the form
      reset();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col text-black gap-1"
    >
      <Input
        type="text"
        placeholder="Categoría de la tarjeta"
        {...register("title", {
          required: "Categoría es requerida",
        })}
        error={errors.title?.message}
      />
      <Input
        type="textarea"
        placeholder="contenido"
        {...register("content", {
          required: "contenido es requerido",
        })}
        error={errors.content?.message}
      />
      <Button type="submit">Añadir tarjeta</Button>
    </form>
  );
}