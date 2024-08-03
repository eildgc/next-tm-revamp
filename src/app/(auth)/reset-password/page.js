import Card from "@/components/card/Card";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ResetPassword from "@/components/forms/ResetPassword";

const RegisterPage = async () => {

  const session = await getServerSession();
  if (session) {
    redirect('/room');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title={"Resetear password"}>
        <ResetPassword />
      </Card>
    </div>
  );
};

export default RegisterPage;
