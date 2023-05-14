import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const winnerBarColors = [
  "#FCECC7",
  "#EFEFEF",
  "#DCD1CD",
];
const maxBarHeight = 200;

interface Props {
  order: 1 | 2 | 3;
  avatarUrl?: string;
  firstName?: string;
  points?: number;
  maxPoints?: number;
}

const TopWinnerBar = (props: Props) => {
  const orderLabel = props.order === 1 ? "1st" : props.order === 2 ? "2nd" : "3rd";
  const avatarUrl = props.avatarUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  const firstName = props.firstName || "";
  const points = props.points ? `${props.points} PTS` : "";
  const barHeight = props.maxPoints && props.points ? (maxBarHeight / props.maxPoints * props.points) : 0;

  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
      gap={2}
      sx={{
        width: "150px",
        textAlign: "center",
      }}
    >
      <Avatar src={avatarUrl} sx={{ width: 96, height: 96 }} />
      <Typography fontWeight="bold" fontSize={20}>{firstName}</Typography>
      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
        sx={{
          width: "100%",
          height: barHeight + "px",
          borderRadius: "30px 30px 0px 0px",
          backgroundColor: winnerBarColors[props.order - 1],
          paddingBottom: "12px"
        }}
      >
        <Typography fontWeight="bold" fontSize={18}>{orderLabel}</Typography>
        <Chip label={points} size="small" variant="filled" />
      </Stack>
    </Stack>
  );
};

export default TopWinnerBar;