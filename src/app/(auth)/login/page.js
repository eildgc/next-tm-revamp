import Card from "@/components/card/Card";
import EmailLogin from "@/components/forms/EmailLogin";
import Login from "@/components/forms/Login";
import ProviderLogin from "@/components/forms/ProviderLogin";
import LineBreak from "@/components/linebreak/LineBreak";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {

  const session = await getServerSession();
  if (session) {
    redirect('/room');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title="Inicia sesión">
        <EmailLogin />
        <LineBreak>or</LineBreak>
        <ProviderLogin />
        <LineBreak>or</LineBreak>
        <Login />
        <Link className="text-center hover:underline" href={"/forgot"}>
          Olvidaste la contraseña?
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
