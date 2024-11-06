import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import theme from "../../layout/Theme";

interface TableHeaderProps {
  columns: GridColDef[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    setScrollbarWidth(scrollbarWidth);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor:  theme.palette.grey[300],
      }}
    >
      <TableContainer
        sx={{
          borderBottom: "none",
          paddingLeft: "0px",
          paddingRight: "20px",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  className={column.cellClassName as string}
                  sx={{
                    backgroundColor: theme.palette.grey[300],
                    fontWeight: "bold",
                    width: column.width,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableHeader;
