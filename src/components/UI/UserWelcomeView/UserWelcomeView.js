import classes from "./UserWelcomeView.module.css";
import { Avatar, Card, CardHeader } from "@mui/material";

function UserWelcomeView() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let dayTime = "";
  if (currentHour >= 5 && currentHour < 12) {
    dayTime = "morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    dayTime = "afternoon";
  } else {
    dayTime = "evening";
  }
  const user = JSON.parse(localStorage.getItem("user"));
  let title = null;

  if (user) {
    title = (
      <div>
        <p style={{ marginBottom: 0, fontSize: 20, fontWeight: "bold" }}>
          Good {dayTime}, {user.firstName}!
        </p>
        <p style={{ margin: 0 }}>Welcome to your CRM dashboard!</p>
      </div>
    );
  } else {
    title = <p>Loading user data...</p>; 
  }

  return (
    <Card style={{ padding: 0 }}>
      <CardHeader
        style={{ paddingTop: 0 }}
        avatar={<Avatar src="/images/clapping.png" />}
        action={
          <img
            className={classes.meeting}
            src="/images/welcome.jpg"
            alt="Business Meeting"
          />
        }
        title={title}
      ></CardHeader>
    </Card>
  );
}

export default UserWelcomeView;
