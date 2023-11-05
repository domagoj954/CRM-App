import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const InteractionEmail = ({ props }) => {
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Recipients</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Email type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          key={props.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {props.recipients.map((r, index) => (
              <p key={index}>{r}</p>
            ))}
          </TableCell>
          <TableCell component="th" scope="row">
            {props.subject}
          </TableCell>
          <TableCell>
            <Chip label={props.type} color="primary" variant="outlined"></Chip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InteractionEmail;
