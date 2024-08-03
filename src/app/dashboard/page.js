// "use client";
// import { useSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // const session = useSession();
  // console.log("use Session", session);

  const session = await getServerSession();
  if(!session) {
    redirect("/login");
  }

  return <div>dashboard
    {/* {JSON.stringify(session?.data)} */}
  </div>;
};

export default DashboardPage;
