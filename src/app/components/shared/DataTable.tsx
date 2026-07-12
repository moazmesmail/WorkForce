import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Search, FileX } from 'lucide-react';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  searchPlaceholder?: string;
  searchableKey?: keyof T;
  title?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  searchPlaceholder = 'Search...',
  searchableKey,
  title,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    if (!searchQuery || !searchableKey) return true;
    const value = row[searchableKey];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      {(title || searchableKey) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: '1px solid #F1F5F9',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {title && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                {filteredRows.length} {filteredRows.length === 1 ? 'record' : 'records'}
              </Typography>
            </Box>
          )}
          {!title && (
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              {filteredRows.length} {filteredRows.length === 1 ? 'record' : 'records'}
            </Typography>
          )}
          {searchableKey && (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={15} color="#94A3B8" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', sm: 260 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#F8FAFC',
                  '& fieldset': { borderColor: '#E2E8F0' },
                  '&:hover fieldset': { borderColor: '#CBD5E1' },
                  '&.Mui-focused fieldset': { borderColor: '#1565C0' },
                },
              }}
            />
          )}
        </Box>
      )}

      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow hover tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id as keyof T];
                  return (
                    <TableCell key={column.id as string} align={column.align}>
                      {column.format ? column.format(value, row) : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {displayedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      py: 6,
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '12px',
                        backgroundColor: '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileX size={24} color="#94A3B8" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                      No records found
                    </Typography>
                    {searchQuery && (
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Try adjusting your search terms
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid #F1F5F9' }}
      />
    </Box>
  );
}
