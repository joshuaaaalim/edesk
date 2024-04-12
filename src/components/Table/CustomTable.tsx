// TableComponent.tsx
import React from "react";
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Button,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronUp,
  IconChevronDown,
  IconSearch,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./CustomTable.module.css";
import { props } from "../homepage/props";

interface RowData {
  name: string;
  address: string;
  city: string;
  pinCode: string;
  country: string;
}

interface CustomTableProps {
  data: RowData[];
  onView(row: RowData): void;
  onEdit(row: RowData): void;
  onDelete(row: RowData): void;
  reverseSortDirection: boolean;
  setSorting(field: any): void;

  // Pass required props for sorting to Th component
  Th: React.FC<props>;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  Th, // Receive Th component as a prop
}) => {
  return (
    <Table className={classes.wholeTable}>
      <Table.Tbody>
        <Table.Tr>
          <Th sortable reversed={false} sorted={false} onSort={() => {}}>
            Name
          </Th>
          <Th sortable reversed={false} sorted={false} onSort={() => {}}>
            Address
          </Th>
          <Th sortable reversed={false} sorted={false} onSort={() => {}}>
            City
          </Th>
          <Th sortable reversed={false} sorted={false} onSort={() => {}}>
            Pin Code
          </Th>
          <Th sortable reversed={false} sorted={false} onSort={() => {}}>
            Country
          </Th>
          <Th
            sortable={false}
            reversed={false}
            sorted={false}
            onSort={() => {}}
          >
            Actions
          </Th>
        </Table.Tr>
        {data.map((row, index) => (
          <Table.Tr key={index}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.address}</Table.Td>
            <Table.Td>{row.city}</Table.Td>
            <Table.Td>{row.pinCode}</Table.Td>
            <Table.Td>{row.country}</Table.Td>
            <Table.Td className={classes.actionButtons}>
              <Button
                onClick={() => onView(row)}
                variant="link"
                className={classes.viewbutton}
              >
                <IconEye /> View
              </Button>
              <Button
                // onClick={() => onEdit(row)}
                variant="link"
                className={classes.editbutton}
              >
                <IconEdit /> Edit
              </Button>
              <Button
                // onClick={() => onDelete(row)}
                variant="link"
                className={classes.trashbutton}
              >
                <IconTrash /> Delete
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
