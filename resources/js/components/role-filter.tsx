import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Table } from '@tanstack/react-table';

interface RoleFilterProps<TData> {
    table: Table<TData>;
}

export function RoleFilter<TData>({ table }: RoleFilterProps<TData>) {
    const column = table.getColumn('role');

    return (
        <Select
            value={(column?.getFilterValue() as string) ?? 'all'}
            onValueChange={(val) => column?.setFilterValue(val)}
        >
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
            </SelectContent>
        </Select>
    );
}
