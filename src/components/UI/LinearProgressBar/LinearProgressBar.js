import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Tooltip } from "@mui/material";

export default function LinearProgressBar({ percent, index }) {
  let backgroundColor = "#1a90ff";
  let barColor = "#308fe8";

  if (percent >= 0 && percent <= 30) {
    backgroundColor = "#fb4d55";
    barColor = "#fcc4c4";
  } else if (percent > 30 && percent <= 50) {
    backgroundColor = "#f49949";
    barColor = "#fff2de";
  } else {
    backgroundColor = "#2ea351";
    barColor = "#a8edba";
  }
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: barColor,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        theme.palette.mode === "light" ? backgroundColor : barColor,
    },
  }));
  return (
    <Tooltip title={`Project progress status: ${percent}%`} key={index}>
      <BorderLinearProgress variant="determinate" value={percent} />
    </Tooltip>
  );
}
