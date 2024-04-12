import cx from "clsx";
import { Box, Text, Group, rem } from "@mantine/core";
import { useState } from "react";
import { IconListSearch } from "@tabler/icons-react";
import classes from "./TreeNav.module.css";

interface Link {
  label: string;
  link: string;
  order: number;
  subLinks: SubLink[];
}

interface SubLink {
  label: string;
  link: string;
  order: number;
}

const links: Link[] = [
  {
    label: "USA",
    link: "/usa",
    order: 1,
    subLinks: [
      { label: "New York", link: "/newyork", order: 2 },
      { label: "Portland", link: "/portland", order: 2 },
      { label: "Los Angeles", link: "/losangeles", order: 2 },
    ],
  },
  {
    label: "Australia",
    link: "/australia",
    order: 1,
    subLinks: [
      { label: "Sydney", link: "/sydney", order: 2 },
      { label: "Melbourne", link: "/melbourne", order: 2 },
      { label: "Perth", link: "/perth", order: 2 },
    ],
  },
  {
    label: "Malaysia",
    link: "/malaysia",
    order: 1,
    subLinks: [
      { label: "Kuala Lumpur", link: "/kualalumpur", order: 2 },
      { label: "Selangor", link: "/selangor", order: 2 },
      { label: "Penang", link: "/penang", order: 2 },
    ],
  },
];

export function TreeNav() {
  const [active, setActive] = useState<number | null>(null);

  const handleLinkClick = (index: number) => {
    setActive(active === index ? null : index);
  };

  const renderSubLinks = (subLinks: SubLink[]) => {
    return subLinks.map((subLink: SubLink) => (
      <Box
        component="a"
        href={subLink.link}
        key={subLink.label}
        className={classes.subLink}
      >
        {subLink.label}
      </Box>
    ));
  };

  const items = links.map((item: Link, index: number) => (
    <div key={item.label}>
      <Box
        component="a"
        href={item.link}
        onClick={(event) => {
          event.preventDefault();
          handleLinkClick(index);
        }}
        className={cx(classes.link, {
          [classes.linkActive]: active === index,
        })}
        style={{
          paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))`,
        }}
      >
        {item.label}
      </Box>
      {active === index && (
        <div className={classes.dropdown}>{renderSubLinks(item.subLinks)}</div>
      )}
    </div>
  ));

  return <div className={classes.treeNavContainer}>{items}</div>;
}

export default TreeNav;
