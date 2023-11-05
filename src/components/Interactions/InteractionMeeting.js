import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
const InteractionMeeting = ({ props }) => {
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
          <TableCell>Location</TableCell>
          <TableCell>Num of participants</TableCell>
          <TableCell>Notes</TableCell>
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
          <TableCell>{props.location}</TableCell>
          <TableCell>{props.number_of_participants}</TableCell>
          <TableCell>
            <Typography color="primary" variant="outlined">
              {props.notes}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InteractionMeeting;
