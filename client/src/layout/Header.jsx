import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/list">List Post</NavLink>
        <NavLink to="/create">Create Post</NavLink>
      </nav>
    </>
  );
};

export default Header;
