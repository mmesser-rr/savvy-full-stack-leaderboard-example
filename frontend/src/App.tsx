import { Box, Container, Typography } from "@mui/material";
import { GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";

import LeaderBoard from "./components/leaderboard/LeaderBoard";
import Top3PresentationTable from "./components/top3-table/Top3PresentationTable";
import { Stat } from "./core/interfaces/stat.type";
import { fetcher } from "./core/lib/fetcher";
import { formatOrderWithSuffix } from "./core/utils/string.utils";

function App() {
  const { data, error, isLoading, mutate } = useSWR<Stat[], Error>("/api/stats/findStats", fetcher);

  const rows: GridRowsProp = React.useMemo(() => {
    let order = 1;
    return data?.map((stat, index) => {
      if (index > 0 && stat.points !== data[index - 1].points) {
        order++;
      }
      return {
        id: index,
        place: {
          label: formatOrderWithSuffix(order),
          deltaSign: stat.deltaSign
        },
        uuid: stat.id,
        name: {
          username: `${stat.firstName} ${stat.lastName}`,
          avatarUrl: stat.avatarUrl
        },
        points: stat.points
      };
    }) || [];
  }, [data]);

  return (
    <Container>
      <Typography my={5} variant="h2" fontWeight="bold" textAlign="center" letterSpacing={20}>LEADERBOARD</Typography>
      <Top3PresentationTable
        firstPlayer={data?.at(0)}
        secondPlayer={data?.at(1)}
        thirdPlayer={data?.at(2)}
      />
      <Box sx={{ my: 4 }} />
      <LeaderBoard
        rows={rows}
        isLoading={isLoading}
        error={error}
        refetch={mutate}
      />
    </Container>
  );
}

export default App;
