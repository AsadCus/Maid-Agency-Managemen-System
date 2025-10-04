import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { ActionType } from './action-column';
import { DataTableExport } from './data-table-export';
import { DataTableSettings } from './data-table-settings';
import { Button } from './ui/button';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    actions?: ActionType[];
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    density: string | undefined;
    setDensity: (value: string) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    renderFilter?: (table: Table<TData>) => React.ReactNode;
    onAction?: (action: ActionType, row?: any) => void;
}

export function DataTableToolbar<TData>({
    table,
    actions,
    globalFilter,
    setGlobalFilter,
    density,
    setDensity,
    searchQuery,
    setSearchQuery,
    renderFilter,
    onAction,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex w-full justify-between">
            <div className="flex flex-1 items-center gap-2">
                <DataTableSettings
                    table={table}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    density={density}
                    setDensity={setDensity}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    renderFilter={renderFilter}
                />
                {(isFiltered || globalFilter) && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            setGlobalFilter('');
                        }}
                    >
                        Reset
                        <X />
                    </Button>
                )}
                {actions?.includes('add') && (
                    <Button onClick={() => onAction?.('add')}>Add</Button>
                )}
            </div>

            <DataTableExport table={table} />
        </div>
    );
}
