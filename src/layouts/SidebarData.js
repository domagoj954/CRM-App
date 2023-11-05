import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import Home from "../components/Home/Home";
import Clients from "../components/Clients/components/clients-grid/ClientsGrid";
import Interactions from "../components/Interactions/Interactions";
import Board from "../components/Board/Board";
import Opportunity from "../components/Opportunities/Opportunity";
import HelpDesk from "../components/HelpDesk/HelpDesk";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Documents from "../components/Documents/Documents";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import Reports from "../components/Reports/Reports";
import { AiFillBook } from "react-icons/ai";
import SegmentIcon from "@mui/icons-material/Segment";
import Segmentation from "../components/Segmentation/Segmentation";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    component: Home,
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <PeopleIcon />,
    cName: "nav-text",
    component: Clients,
  },
  {
    title: "Interactions",
    path: "/interactions",
    icon: <FaIcons.FaListAlt />,
    cName: "nav-text",
    component: Interactions,
  },
  {
    title: "Board",
    path: "/board",
    icon: <FaIcons.FaChalkboard />,
    cName: "nav-text",
    component: Board,
  },
  {
    title: "Opportunities",
    path: "/opportunities",
    icon: <QuizIcon />,
    cName: "nav-text",
    component: Opportunity,
  },
  {
    title: "Help desk",
    path: "/help-desk",
    icon: <SupportAgentIcon />,
    cName: "nav-text",
    component: HelpDesk,
  },
  {
    title: "Documents",
    path: "/documents",
    icon: <PermMediaIcon />,
    cName: "nav-text",
    component: Documents,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <AiFillBook />,
    cName: "nav-text",
    component: Reports,
  },
  {
    title: "Marketing",
    path: "/marketing",
    icon: <SegmentIcon />,
    cName: "nav-text",
    component: Segmentation,
  },
];
