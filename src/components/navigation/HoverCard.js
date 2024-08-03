"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    title: "Room",
    linkUrl: "/room",
  },
];

const HoverCard = () => {
  const [showHoverCard, setShowHoverCard] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setShowHoverCard((i) => !i)}>
        <Image
          className="w-10 h-10"
          width={50}
          height={50}
          src={"/mstile-70x70.png"}
          alt="U"
        />
      </button>
      {showHoverCard && (
        <div className="absolute right-5 top-5 z-10 bg-slate-700 w-64 flex flex-col rounded-xl">
          {menuItems?.map((item, index) => (
            <Link
              className={`w-full px-5 py-3 text-white font-medium text-xl hover:bg-blue-600 uppercase ${
                index === 0 ? "rounded-t-xl" : ""}`}
              key={index}
              href={item?.linkUrl}
            >
              {item?.title}
            </Link>
          ))}
          <button onClick={() => signOut()}
            className={`w-full px-5 py-3 text-white font-medium text-xl text-left hover:bg-blue-600 uppercase rounded-b-xl`}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default HoverCard;
