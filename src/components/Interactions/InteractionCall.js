import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const InteractionCall = ({ props, clientData }) => {
  const startDate = new Date(props.startDateTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const endDate = new Date(props.endDateTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Phone number</TableCell>
          <TableCell>Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          key={props.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {startDate}
          </TableCell>
          <TableCell component="th" scope="row">
            {endDate}
          </TableCell>
          <TableCell>{props.duration}</TableCell>
          <TableCell>{clientData.phone_number}</TableCell>
          <TableCell>
            <Chip label={props.type} color="primary" variant="outlined"></Chip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InteractionCall;
