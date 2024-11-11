import { TableCell, TableHead, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import theme from "../../layout/Theme";

interface TableHeaderProps {
  columns: GridColDef[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <TableHead sx={{ display: "table-header-group" }}>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            className={column.cellClassName as string}
            sx={{
              border: 0,
              borderBottom: 2,
              borderBlockColor: theme.palette.grey[200],
              fontWeight: "bold",
              width: column.width,
            }}
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
