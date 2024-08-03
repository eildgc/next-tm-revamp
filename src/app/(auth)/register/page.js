import Card from "@/components/card/Card";
import ProviderLogin from "@/components/forms/ProviderLogin";
import Register from "@/components/forms/Register";
import LineBreak from "@/components/linebreak/LineBreak";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EmailLogin from "@/components/forms/EmailLogin";

const RegisterPage = async () => {

  const session = await getServerSession();
  if (session) {
    redirect('/room');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title={"Regístrate ahora"}>
        <ProviderLogin />
        <LineBreak>or</LineBreak>
        <Register />
        <LineBreak>or</LineBreak>
        <EmailLogin />
      </Card>
    </div>
  );
};

export default RegisterPage;
