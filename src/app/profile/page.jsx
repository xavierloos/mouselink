"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@src/components/Form";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import axios from "axios";
import { Avatar } from "@mui/material";

const Profile = () => {
  // const { data: session } = useSession();
  const [session, setSession] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const res = await axios.get("/api/users/me");
    setSession(res.data.data);
  };

  return (
    <>
      <h2 className="w-full head_text text_left blue_gradient  normal-case">
        Profile
      </h2>
      <section className="w-full max-w-full">
        <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <div className="flex flex-start justify-center align-center ">
            <Avatar
              alt="Remy Sharp"
              src={session?.image ?? "/static/images/avatar/1.jpg"}
              sx={{ width: 50, height: 50 }}
            />
            <p>{session?.f_name}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
