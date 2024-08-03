"use client";
import Image from "next/image";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

const GithubIcon = "http://localhost:3000/assets/icon/github.svg";
const GoogleIcon = "http://localhost:3000/assets/icon/google.svg";

const providers = [
  {
    name: "github",
    Icon: GithubIcon,
  },
  {
    name: "google",
    Icon: GoogleIcon,
  },
];

const ProviderLogin = () => {
  const handleSignIn = (provider) => {
    signIn(provider);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
      {providers?.map((provider, index) => (
        <Button handler={()=>handleSignIn(provider?.name)}
          key={index}
          className="flex items-center justify-center gap-2"
          variant="secondary"
        >
          <Image
            className="w-8 h-8 p-1 bg-white rounded-full"
            src={provider?.Icon}
            alt=""
            width={50}
            height={50}
          />
          <h3 className="text-base">Continue with {provider?.name}</h3>
        </Button>
      ))}
    </div>
  );
};

export default ProviderLogin;
