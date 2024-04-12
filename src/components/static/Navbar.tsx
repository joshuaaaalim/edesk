// Navbar.tsx
import React from "react";
import { Group, Title } from "@mantine/core";
import {
  IconHome,
  IconUser,
  IconMessage,
  IconSettings,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

const data = [
  { link: "/home", label: "Home", icon: IconHome },
  { link: "/profile", label: "Profile", icon: IconUser },
  { link: "/messages", label: "Messages", icon: IconMessage },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Title className={classes.title}>E Desk</Title>
        </Group>
        {data.map((item) => (
          <Link
            className={classes.link}
            to={item.link}
            key={item.label}
            data-active={
              window.location.pathname === item.link ? true : undefined
            }
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
