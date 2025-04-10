import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
type RowData = {
  id: number;
  userNumber: number | string | null;
  percentage: number | null;
  dbNumber: number | string | null;
};

//pagination data
const paginationModel = { page: 0, pageSize: 10 };

export default function AppTable({ itemData = [] }: any) {
  //!Vars
  //ensuring that the user can only enter numbers no symbols or special numbers (e.g. e)
  const validButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  //state to store the selected number
  const [data, setData] = useState(itemData);
  //columns
  const columns: GridColDef[] = [
    {
      field: "userNumber",
      renderCell: (params) => {
        return (
          <input
            className="form-input w-full h-full"
            onKeyDown={handleKeyDown}
            onChange={(e) => handleChange(e, params.id)}
          />
        );
      },
      headerName: "User Number",
      width: 320,
      hideSortIcons: true,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "numbers",
      renderCell: (params) => {
        return (
          <select
            className="form-input w-full h-full"
            value={params.row.DbNumber}
            onChange={(e) => handleSelectChange(e, params.id)}
          >
            <option value="" >Select Number</option>
            {itemData.map((item: any) => (
              <option key={item.id} value={item.number}>
                {item.number}
              </option>
            ))}
          </select>
        );
      },
      headerName: "Nums From DB",
      width: 320,
      hideSortIcons: true,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "percentage",
      headerName: "Percentage (%)",
      width: 370,
      renderCell: (params) => {
        return (
          <p className="capitalize">
            {params.row.percentage !== null && params.row.percentage !== -100
              ? params.row.percentage.toFixed(2) + "%"
              : "Select Numbers to calculalte percentage "}
          </p>
        );
      },
      hideSortIcons: true,
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];

  //state to store the row data
  const [rowData, setRowData] = useState<RowData[]>(
    Array.from({ length: itemData.length }).map((_, index: number) => ({
      id: index,
      userNumber: null,
      percentage: null,
      dbNumber: null,
    }))
  );
  // useEffect to set the row data
  useEffect(() => {
    setRowData(
      Array.from({ length: itemData.length }).map((_, index: number) => ({
        id: index,
        userNumber: null,
        percentage: null,
        dbNumber: null,
      }))
    );
  }, [itemData]);

  //!Functions
  //function to handle the change of the user number
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowId: any) => {
    const newData = rowData.map((row) => {
      return row.id === rowId
        ? {
            ...row,
            userNumber: e.target.value,
            percentage: calculatePercentage(e.target.value, row.dbNumber),
          }
        : row;
    });
    setRowData(newData);
  };
  //function to handle the change of the selected number
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    rowId: any
  ) => {
    const newData = rowData.map((row) => {
      return row.id === rowId
        ? {
            ...row,
            dbNumber: e.target.value,
            percentage: calculatePercentage(row.userNumber, e.target.value),
          }
        : row;
    });
    console.log(newData)
    setRowData(newData);
  };
  //function to handle the keydown event
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Backspace" && !validButtons.includes(event.key)) {
      event.preventDefault();
    }
  };
  //function to calculate the percentage
  const calculatePercentage = (userNumber: any, dbNumber: any): number => {
    if (dbNumber && userNumber) {
      let percentage = (userNumber / dbNumber) * 100;
      return percentage;
    } else {
      return -100;
    }
  };

  return (
    <Paper sx={{ height: 500, width: "70rem" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
