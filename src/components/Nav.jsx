"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from "@mui/icons-material/Public";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <img
          src={`https://source.unsplash.com/random/150x150`}
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">MouseLink</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/discover">
            <div className="d-flex flex-col flex-center">
              <PublicIcon color="disabled" />
              <span className="text-xs">Discover</span>
            </div>
          </Link>
          {session?.user ? (
            <>
              <Link href="/profile">
                <div className="d-flex flex-col flex-center">
                  <Avatar
                    alt="Remy Sharp"
                    src={session?.user.image ?? "/static/images/avatar/1.jpg"}
                    sx={{ width: 24, height: 24 }}
                  />
                  <span className="text-xs">
                    {session?.user.name.split(" ")[0] ?? "Account"}
                  </span>
                </div>
              </Link>
              <div onClick={logout}>
                <div className="d-flex flex-col flex-center">
                  <LogoutIcon color="disabled" />
                  <span className="text-xs">Logout</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <>
                    <Link href="/account" key={session?._id}>
                      <div className="d-flex flex-col flex-center">
                        <AccountCircleIcon color="disabled" />
                        <span className="text-xs">
                          {session?.user ?? "Account"}
                        </span>
                      </div>
                    </Link>
                  </>
                ))}
            </>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative z-10">
        {session?.user ? (
          <div className="flex">
            <MenuIcon
              sx={{ color: "blue_gradient" }}
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {/* <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            /> */}

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/account"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Account
                </Link>
                <Link
                  href="/discover"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Discover
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <div className="flex gap-3 md:gap-5" key={session?._id}>
                    <Link href="/discover">
                      <div className="d-flex flex-col flex-center">
                        <PublicIcon color="disabled" />
                        <span className="text-xs">Discover</span>
                      </div>
                    </Link>
                    <Link href="/account">
                      <div className="d-flex flex-col flex-center">
                        <AccountCircleIcon color="disabled" />
                        <span className="text-xs">
                          {session?.user ?? "Account"}
                        </span>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
