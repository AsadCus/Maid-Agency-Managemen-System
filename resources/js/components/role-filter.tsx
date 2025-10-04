import { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DropdownMenuLabel } from './ui/dropdown-menu';

interface RoleFilterProps<TData> {
    table: Table<TData>;
}

export function RoleFilter<TData>({ table }: RoleFilterProps<TData>) {
    const roles = [
        {
            value: 'admin',
            label: 'Admin',
        },
        {
            value: 'sales',
            label: 'Sales',
        },
        {
            value: 'customer',
            label: 'Customer',
        },
        {
            value: 'supplier',
            label: 'Supplier',
        },
    ];

    return (
        <div className="space-y-1">
            <DropdownMenuLabel>Role Filter</DropdownMenuLabel>
            <DataTableFacetedFilter
                column={table.getColumn('role')}
                title="Role"
                options={roles}
            />
        </div>
    );
}
