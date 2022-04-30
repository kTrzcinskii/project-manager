import { IconType } from "react-icons";
import { BiHome } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BsCalendarX, BsCalendarCheck, BsCalendarEvent } from "react-icons/bs";

interface SidebarLinkProps {
  text: string;
  icon: IconType;
  link: string;
}

const SidebarLinks: Array<SidebarLinkProps> = [
  { text: "Home", icon: BiHome, link: "/home" },
  {
    text: "Favorite",
    icon: MdFavoriteBorder,
    link: "/favorite",
  },
  {
    text: "Finished",
    icon: BsCalendarCheck,
    link: "/finished",
  },
  {
    text: "In Progress",
    icon: BsCalendarEvent,
    link: "/in_progress",
  },
  { text: "Backlog", icon: BsCalendarX, link: "/backlog" },
  { text: "Settings", icon: FiSettings, link: "/settings" },
];

export default SidebarLinks;
