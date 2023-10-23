"use client";
import { useState, useEffect } from "react";
import CardUser from "@src/components/CardUser";

const CardUsers = ({ data, handleClick }) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 sm:grid-cols-3">
      {data.map((user) => (
        <CardUser key={user.id} user={user} handleClick={handleClick} />
      ))}
    </div>
  );
};

const Discover = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <h2
        className="w-full head_text text_left orange_gradient
       normal-case"
      >
        Discover
      </h2>
      <CardUsers data={users} handleClick={() => {}} />
    </div>
  );
};

export default Discover;
