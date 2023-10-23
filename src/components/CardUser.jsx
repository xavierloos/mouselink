"use client";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";

const CardUser = ({ user, handleClick }) => {
  return (
    <div className="card">
      <div className="avatar">
        <Avatar
          alt=""
          src={
            user.image
              ? user.image
              : "https://source.unsplash.com/random/150x150/?animal"
          }
          sx={{ width: 100, height: 100 }}
          className="img-fluid"
        />
      </div>
      <div className="team-content">
        <h3 className="name">@{user.username}</h3>
        <button
          type="button"
          onClick={() => {}}
          className="m-auto mt-2 outline_btn"
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default CardUser;
