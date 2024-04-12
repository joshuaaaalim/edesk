import { Outlet } from "react-router-dom";
import Navbar from "./components/static/Navbar";
import classes from "./index.module.css";
import { Button } from "@mantine/core";

export default function General() {
  return (
    <div className={classes.generalContainer}>
      <Navbar />
      <Outlet />
    </div>
  );
}
