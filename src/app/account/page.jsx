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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Account = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    username: "",
    f_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [value, setValue] = useState("1");

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axios.post("/api/users/register", data);
      router.push("/profile");
      console.log("HERE");
    } catch (error) {
      setError(error.response["data"]["error"]);
    } finally {
      setSubmitting(false);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axios.post("/api/users/login", data);
      router.push("/profile");
    } catch (error) {
      setError(error.response["data"]["error"]);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TabContext value={value}>
          <Box sx={{ borderBottom: 0 }}>
            <TabList onChange={handleChange}>
              <Tab
                label="Login"
                value="1"
                className="head_text text_left  normal-case"
              />
              <Tab
                label="Register"
                value="2"
                className="head_text text_left  normal-case"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Form
              type="Login"
              data={data}
              setData={setData}
              submitting={submitting}
              handleSubmit={loginUser}
            />
          </TabPanel>
          <TabPanel value="2">
            <Form
              type="Register"
              data={data}
              setData={setData}
              submitting={submitting}
              handleSubmit={registerUser}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Account;
