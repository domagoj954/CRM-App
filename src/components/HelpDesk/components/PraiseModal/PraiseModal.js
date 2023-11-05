import classes from "./PraiseModal.module.css";
import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import emailjs from "emailjs-com";

const PraiseModalTemplate = (props) => {
  const [to, setTo] = useState(props.item.email);
  const [subject, setSubject] = useState(
    "Feedback Appreciation: Thanks for Your Kind Words"
  );
  const [message, setMessage] = useState(
    `Hello ${props.item.name}, \n\n Your kind words and appreciation mean a lot to us and serve as a great source of motivation for our team. We're committed to delivering exceptional CRM APP, and your feedback reaffirms that we're on the right track.  \n\n Yours sincerely, \n CRM team`
  );
  const publicKey = "LJMLIT5n4pcNTVEQa";
  const serviceId = "service_kwatvpi";
  const templateId = "template_hfvcqog";

  const handleSend = () => {
    emailjs.init(publicKey);
    const templateParams = {
      to_email: "dejanicatest999@gmail.com",
      from_name: "CRM APP",
      subject: subject,
      message_html: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams)
      .then((response) => {
        if (response.status === 200) {
          props.onEmailSend(props.item.id);
          props.onModalClose({ isToastOpen: true, message: "Email sent!" });
        }
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
      });
  };
  const handleClose = () => {
    props.onModalClose(null);
  };

  return (
    <Modal open={props.open}>
      <div className={classes.modal}>
        <Box className={classes.praiseBox}>
          <Typography variant="h6" gutterBottom>
            Compose Email
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="To"
              variant="outlined"
              fullWidth
              value={to}
              disabled
              onChange={(e) => setTo(e.target.value)}
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={6}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Stack>
          <div style={{ paddingTop: 30 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              style={{ float: "right" }}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
};

export default PraiseModalTemplate;
