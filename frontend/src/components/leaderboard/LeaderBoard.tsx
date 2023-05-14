import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from "@mui/icons-material/Save";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  MuiEvent
} from '@mui/x-data-grid';
import React from "react";
import { KeyedMutator } from "swr";

import { Stat } from "../../core/interfaces/stat.type";

interface Props {
  rows: GridRowsProp;
  isLoading: boolean;
  error: any;
  refetch: KeyedMutator<Stat[]>;
}

const LeaderBoard = ({
  rows,
  isLoading,
  error,
  refetch
}: Props) => {
  const [isUpdatingTable, setIsUpdatingTable] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const columns: GridColDef[] = [
    {
      field: "place",
      headerName: "Place",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams<{
        label: string,
        deltaSign: -1 | 0 | 1;
      }>) => (
        <Stack direction="row" alignItems="center" gap={1}>
          {params.value.deltaSign === 1 ? (
            <ArrowDropUpIcon color="success" />
          ) : params.value.deltaSign === -1 ? (
            <ArrowDropDownIcon color="error" />
          ) : (
            <RemoveIcon color="disabled" />
          )}
          <Typography>{params.value.label}</Typography>
        </Stack>
      )
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      sortable: false,
      renderCell: (params: GridRenderCellParams<{
        username: string,
        avatarUrl: string;
      }>) => (
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar src={params.value.avatarUrl} />
          <Typography>{params.value.username}</Typography>
        </Stack>
      ),
    },
    {
      field: "points",
      headerName: "Points",
      flex: 1,
      editable: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Number>) => (
        <Typography>{params.value} PTS</Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      cellClassName: "actions",
      disableColumnMenu: false,
      width: 120,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        const actionItems = [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];

        return actionItems;
      },
    }
  ];

  const processRowUpdate = async (
    newRow: GridRowModel,
    _oldRow: GridRowModel
  ) => {
    setIsUpdatingTable(true);

    const updatedRow = newRow;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/stats/updateStat`,
        {
          method: "POST",
          headers: {
            'Content-type': "application/json",
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: newRow.uuid,
            points: +newRow.points
          })
        }
      );
      const result = await response.json();
      if (result) {
        refetch();
      }
      setIsUpdatingTable(false);
      return updatedRow;
    } catch (e) {
      console.log(e);
    }
    setIsUpdatingTable(false);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: "points" } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowEditStart = (
    _params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    _params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  if (error) {
    return (
      <Typography color="error">Failed to load data.</Typography>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      loading={isLoading || isUpdatingTable}
      checkboxSelection={false}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStart={handleRowEditStart}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={console.error}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      rowHeight={60}
      columnHeaderHeight={48}
      sx={{
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: "bold",
          fontSize: "16px"
        },
      }}
    />
  );
};

export default LeaderBoard;