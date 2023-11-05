import { Fragment } from "react";
import Reminders from "../Reminders/Reminders";
import Meetings from "../Meetings/Meetings";

const Checklist = () => {
  return (
    <Fragment>
      <Meetings />
      <Reminders />
    </Fragment>
  );
};

export default Checklist;
