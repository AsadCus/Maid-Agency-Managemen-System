import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { DataTableExport } from './data-table-export';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSettings } from './data-table-settings';

interface DataTableProps<TData, TValue = unknown> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    renderToolbar?: (
        table: ReturnType<typeof useReactTable<TData>>,
    ) => React.ReactNode;
}

export function DataTable<TData, TValue = unknown>({
    columns,
    data,
    renderToolbar,
}: DataTableProps<TData, TValue>) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [density, setDensity] = useState<string>('standard');

    const table = useReactTable({
        data,
        columns,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                {/* <Input
                    placeholder="Search..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-[200px]"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full max-w-[140px] justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <Columns3Icon />
                                Columns
                            </span>{' '}
                            <ChevronDownIcon className="ml-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <div className="relative">
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                                placeholder="Search"
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <SearchIcon className="absolute inset-y-0 left-2 my-auto h-4 w-4" />
                        </div>
                        <DropdownMenuSeparator />
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                if (
                                    searchQuery &&
                                    !column.id
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                ) {
                                    return null;
                                }

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                table.resetColumnVisibility();
                                setSearchQuery('');
                            }}
                        >
                            <RefreshCcwIcon /> Reset
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Select value={density} onValueChange={setDensity}>
                    <SelectTrigger
                        className="w-[140px]"
                        aria-label="Density select"
                    >
                        <SelectValue placeholder="Density" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Density</SelectLabel>
                            <SelectItem value="compact">
                                <div className="flex items-center gap-2">
                                    <Rows4Icon className="h-4 w-4" />
                                    Compact
                                </div>
                            </SelectItem>
                            <SelectItem value="standard">
                                <div className="flex items-center gap-2">
                                    <Rows3Icon className="h-4 w-4" />
                                    Standard
                                </div>
                            </SelectItem>
                            <SelectItem value="flexible">
                                <div className="flex items-center gap-2">
                                    <Rows2Icon className="h-4 w-4" />
                                    Flexible
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {renderToolbar?.(table)} */}
                <div className="flex w-full justify-between">
                    <DataTableSettings
                        table={table}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        density={density}
                        setDensity={setDensity}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        renderToolbar={renderToolbar}
                    />

                    <DataTableExport table={table} />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table
                    className={cn({
                        '[&_td]:py-1 [&_th]:py-1': density === 'compact',
                        '[&_td]:py-2 [&_th]:py-2': density === 'standard',
                        '[&_td]:py-3 [&_th]:py-3': density === 'flexible',
                    })}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={
                                            header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''
                                        }
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                        {{
                                            asc: (
                                                <ArrowUp className="ml-1 inline h-4 w-4" />
                                            ),
                                            desc: (
                                                <ArrowDown className="ml-1 inline h-4 w-4" />
                                            ),
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ??
                                            (header.column.getCanSort() ? (
                                                <ChevronsUpDown className="ml-1 inline h-4 w-4 text-muted-foreground" />
                                            ) : null)}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    );
}
