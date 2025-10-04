import { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DropdownMenuLabel } from './ui/dropdown-menu';

interface ColumnFilterProps<TData> {
    table: Table<TData>;
    columnId: string;
    title: string;
    options: { value: string; label: string }[];
}

export function ColumnFilter<TData>({
    table,
    columnId,
    title,
    options,
}: ColumnFilterProps<TData>) {
    const column = table.getColumn(columnId);

    if (!column) return null;

    return (
        <div className="space-y-1">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DataTableFacetedFilter
                column={column}
                title={title}
                options={options}
            />
        </div>
    );
}
