import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import theme from "../../layout/Theme";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface TableHeaderProps {
  columns: GridColDef[];
  orderBy: string | null;
  orderDirection: "asc" | "desc";
  onSort: (column: string) => void;
}

const TableHeader = ({
  columns,
  orderBy,
  orderDirection,
  onSort,
}: TableHeaderProps) => {
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
              cursor: column.sortable ? "pointer" : "default",
            }}
            onClick={() => column.sortable && onSort(column.field)}
          >
            <Box display="flex" alignItems="center">
              {column.headerName}
              {orderBy === column.field && (
                <Box ml={1} sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                  {orderDirection === "asc" ? (
                    <ArrowUpwardIcon fontSize="inherit" />
                  ) : (
                    <ArrowDownwardIcon fontSize="inherit" />
                  )}
                </Box>
              )}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
