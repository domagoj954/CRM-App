import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CallIcon from "@mui/icons-material/Call";
import { Avatar } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const InteractionItem = ({ data, open, onOpen }) => {
  const date = new Date(data.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const interactionTypeIcon =
    data.type === "call" ? (
      <CallIcon />
    ) : data.type === "meeting" ? (
      <Groups2Icon />
    ) : (
      <MarkEmailReadIcon />
    );
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => onOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        <span style={{ fontWeight: "bold" }}>{data.clientData.name}</span>
      </TableCell>
      <TableCell align="right">
        <div style={{ display: "flex" }}>
          <div>
            <Avatar src={`images/${data.user.logo}`} />
          </div>
          <div
            style={{
              marginLeft: 15,
              marginTop: 10,
              display: "inline-table",
            }}
          >
            {data.user.firstName} {data.user.lastName}
          </div>
        </div>
      </TableCell>
      <TableCell>{interactionTypeIcon}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
};

export default InteractionItem;
