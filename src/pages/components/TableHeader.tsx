import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import theme from "../../layout/Theme";

interface TableHeaderProps {
  columns: GridColDef[];
  tableRef: React.RefObject<HTMLDivElement>;
}

const TableHeader = ({ columns, tableRef }: TableHeaderProps) => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const checkScrollbar = () => {
      if (tableRef.current) {
        const { scrollHeight, clientHeight } = tableRef.current;
        setHasScrollbar(scrollHeight > clientHeight);
      }
    };

    // Check on mount and when resizing the window
    checkScrollbar();
    window.addEventListener("resize", checkScrollbar);

    return () => {
      window.removeEventListener("resize", checkScrollbar);
    };
  }, [tableRef]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey[300],
      }}
    >
      <TableContainer
        sx={{
          borderBottom: "none",
          paddingLeft: "0px",
          paddingRight: hasScrollbar ? "20px" : "0px", // Adjust padding if scrollbar is visible
          transition: "padding-right 0.2s ease-in-out",
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
                    border: 0,
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
