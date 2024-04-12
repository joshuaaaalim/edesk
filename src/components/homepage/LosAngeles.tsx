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
import jsonData from "./json/losangeles.json";
import { CustomTable } from "../Table/CustomTable";
import TreeNav from "../static/TreeNav";

interface RowData {
  name: string;
  address: string;
  city: string;
  pinCode: string;
  country: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

const data: RowData[] = jsonData;

export function LosAngeles() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newUser, setNewUser] = useState<RowData>({
    name: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
  });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const handleView = (row: RowData) => {
    setSelectedRow(row);
    setModalOpened(true);
  };

  const handleEdit = (row: RowData) => {
    setSelectedRow(row);
    setEditMode(true);
    setModalOpened(true);

    setNewUser({
      name: row.name,
      address: row.address,
      city: row.city,
      pinCode: row.pinCode,
      country: row.country,
    });
  };

  const handleDelete = (row: RowData) => {
    setSelectedRow(row);
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{startIndex + index + 1}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.address}</Table.Td>
      <Table.Td>{row.city}</Table.Td>
      <Table.Td>{row.pinCode}</Table.Td>
      <Table.Td>{row.country}</Table.Td>
      <Table.Td className={classes.actionButtons} style={{ width: "20%" }}>
        <Button onClick={() => handleView(row)} className={classes.viewbutton}>
          <IconEye /> View KPI
        </Button>
        <Button onClick={() => handleEdit(row)} className={classes.editbutton}>
          <IconEdit /> Edit
        </Button>
        <Button
          onClick={() => handleDelete(row)}
          className={classes.trashbutton}
        >
          <IconTrash /> Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.homeContainer}>
      <TreeNav />
      <ScrollArea className={classes.tableContainer}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          w={300}
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />

        <CustomTable
          data={sortedData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          reverseSortDirection={reverseSortDirection}
          Th={Th} // Pass the Th component
          setSorting={setSorting}
        />
      </ScrollArea>

      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title="Details"
        size="md"
      >
        {selectedRow && (
          <>
            <TextInput label="Name" value={selectedRow.name}></TextInput>
            <TextInput label="Address" value={selectedRow.address}></TextInput>
            <TextInput label="City" value={selectedRow.city}></TextInput>
            <TextInput label="Pin Code" value={selectedRow.pinCode}></TextInput>
            <TextInput label="Country" value={selectedRow.country}></TextInput>
          </>
        )}
        <div className={classes.buttonContainer}>
          <Button onClick={handleCloseModal} fullWidth variant="light">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default LosAngeles;
