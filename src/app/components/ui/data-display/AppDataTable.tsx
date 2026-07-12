import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_RowSelectionState,
    MRT_TableOptions,
    MRT_Updater,
    MRT_ExpandAllButton,
} from 'material-react-table'
import { Box, Stack, Typography } from '@mui/material'

type AppDataTableProps<TData extends Record<string, any>> = {
    columns: MRT_ColumnDef<TData>[]
    data: TData[]
    isLoading?: boolean
    isError?: boolean

    enableRowSelection?: boolean
    rowSelection?: MRT_RowSelectionState
    onRowSelectionChange?: (
        updaterOrValue: MRT_Updater<MRT_RowSelectionState>,
    ) => void

    renderRowActions?: MRT_TableOptions<TData>['renderRowActions']
    renderRowActionMenuItems?: MRT_TableOptions<TData>['renderRowActionMenuItems']
    renderTopToolbarCustomActions?: MRT_TableOptions<TData>['renderTopToolbarCustomActions']

    muiTableBodyRowProps?: MRT_TableOptions<TData>['muiTableBodyRowProps']

    initialState?: Partial<MRT_TableOptions<TData>['initialState']>

    enableColumnResizing?: boolean
    enableColumnOrdering?: boolean
    enableColumnActions?: boolean

    layoutMode?: MRT_TableOptions<TData>['layoutMode']
}

export function AppDataTable<TData extends Record<string, any>>({
    columns,
    data,
    isLoading = false,
    isError = false,
    enableRowSelection = false,
    onRowSelectionChange,
    rowSelection,
    renderRowActions,
    renderRowActionMenuItems,
    renderTopToolbarCustomActions,
    muiTableBodyRowProps,
    initialState = {},
    enableColumnResizing = true,
    enableColumnOrdering = true,
    enableColumnActions = true,
    layoutMode = 'grid',
}: AppDataTableProps<TData>) {
    return (
        <MaterialReactTable
            columns={columns}
            data={data ?? []}
            layoutMode={layoutMode}
            state={{
                isLoading,
                showAlertBanner: isError,
                ...(rowSelection !== undefined && { rowSelection }),
            }}
            displayColumnDefOptions={{
                'mrt-row-expand': {
                    Header: ({ table }) => (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <MRT_ExpandAllButton table={table} />
                            <Box>Groups</Box>
                        </Stack>
                    ),

                    GroupedCell: ({ row, table }) => {
                        const { grouping } = table.getState()
                        const groupedColumnId = grouping[row.depth]

                        const columnDef = table
                            .getAllColumns()
                            .find((col) => col.id === groupedColumnId)
                            ?.columnDef

                        if (!groupedColumnId || !columnDef) {
                            return null
                        }

                        const value = row.getValue(groupedColumnId)

                        if (
                            value === undefined ||
                            value === null ||
                            value === ''
                        ) {
                            return null
                        }
                        return (
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Box sx={{ fontWeight: 700 }}>
                                    {String(value)}
                                </Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ({row.subRows?.length ?? 0})
                                </Typography>
                            </Stack>
                        )
                    },

                    enableResizing: true,

                    muiTableBodyCellProps: ({ row }) => ({
                        sx: (theme) => ({
                            color:
                                row.depth === 0
                                    ? theme.palette.primary.main
                                    : row.depth === 1
                                        ? theme.palette.secondary.main
                                        : undefined,

                            fontWeight: row.depth < 2 ? 700 : undefined,

                            '& .MuiIconButton-root': {
                                display: row.getIsGrouped()
                                    ? 'inline-flex'
                                    : 'none',
                            },

                            '& .MuiBox-root': {
                                display: row.getIsGrouped()
                                    ? undefined
                                    : 'none',
                            },
                        }),
                    }),

                    size: 220,
                },
            }}
            enableGlobalFilter
            enableColumnFilters
            enableSorting
            enablePagination
            enableHiding
            enableDensityToggle
            enableFullScreenToggle
            enableColumnOrdering={enableColumnOrdering}
            enableGrouping
            enableColumnActions={enableColumnActions}
            enableColumnResizing={enableColumnResizing}
            groupedColumnMode="remove"
            enableRowSelection={enableRowSelection}
            onRowSelectionChange={onRowSelectionChange}
            enableRowActions={Boolean(
                renderRowActions || renderRowActionMenuItems,
            )}
            renderRowActions={renderRowActions}
            renderRowActionMenuItems={renderRowActionMenuItems}
            renderTopToolbarCustomActions={renderTopToolbarCustomActions}
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined
            }
            muiTablePaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: 3.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 4px 18px -4px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                },
            }}
            muiTableProps={{
                sx: {
                    width: '100%',
                    tableLayout: enableColumnResizing ? undefined : 'auto',
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    fontWeight: 700,
                    bgcolor: 'background.default',
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    verticalAlign: 'top',
                },
            }}
            muiTableBodyRowProps={(props) => {
                const { row } = props

                const externalProps =
                    typeof muiTableBodyRowProps === 'function'
                        ? muiTableBodyRowProps(props)
                        : muiTableBodyRowProps ?? {}

                const isGroupedRow = row.getIsGrouped()

                return {
                    ...externalProps,
                    onClick: isGroupedRow ? undefined : externalProps.onClick,
                    sx: {
                        ...(externalProps.sx || {}),
                        cursor: isGroupedRow ? 'default' : 'pointer',
                        bgcolor: isGroupedRow ? 'action.hover' : undefined,
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    },
                }
            }}
            initialState={{
                showGlobalFilter: true,
                density: 'compact',
                expanded: true,
                pagination: {
                    pageIndex: 0,
                    pageSize: 10,
                },
                ...initialState,
            }}
        />
    )
}