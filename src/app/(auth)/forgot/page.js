import Card from "@/components/card/Card";
import Forget from "@/components/forms/Forget";
import React from "react";

const ForgotPwdPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>
      <Card title="Resetear password">
        <Forget />
      </Card>
    </div>
  );
};

export default ForgotPwdPage;
