import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import { Stat } from "../../core/interfaces/stat.type";
import TopWinnerBar from "../top-winner-bar/TopWinnerBar";

interface Props {
  firstPlayer?: Stat,
  secondPlayer?: Stat,
  thirdPlayer?: Stat;
}
const Top3PresentationTable = ({
  firstPlayer,
  secondPlayer,
  thirdPlayer
}: Props) => {
  return (
    <Card variant="outlined" sx={{ backgroundColor: "#fdfdfd" }}>
      <CardContent>
        <Stack direction="row" justifyContent="center" gap={2}>
          <TopWinnerBar
            order={2}
            firstName={secondPlayer?.firstName}
            avatarUrl={secondPlayer?.avatarUrl}
            points={secondPlayer?.points}
            maxPoints={firstPlayer?.points}
          />
          <TopWinnerBar
            order={1}
            firstName={firstPlayer?.firstName}
            avatarUrl={firstPlayer?.avatarUrl}
            points={firstPlayer?.points}
            maxPoints={firstPlayer?.points}
          />
          <TopWinnerBar
            order={3}
            firstName={thirdPlayer?.firstName}
            avatarUrl={thirdPlayer?.avatarUrl}
            points={thirdPlayer?.points}
            maxPoints={firstPlayer?.points}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Top3PresentationTable;