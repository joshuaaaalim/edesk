import { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Modal,
  Button,
  Title,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./Home.module.css";
import jsonData from "./json/perth.json";
import { CustomTable } from "../Table/CustomTable";
import TreeNav from "../static/TreeNav";

export function Home() {
  return (
    <div className={classes.homeContainer}>
      <TreeNav />
      <Title className={classes.title}>
        Select a city from the Tree Navigation
      </Title>
    </div>
  );
}

export default Home;
