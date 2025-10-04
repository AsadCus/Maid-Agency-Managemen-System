import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

type ActionType = 'view' | 'edit' | 'delete';

interface ActionColumnProps<TData> {
    row: Row<TData>;
    actions?: ActionType[];
    onAction?: (action: ActionType, row: Row<TData>) => void;
}

export function ActionColumn<TData>({
    row,
    actions = ['view', 'edit', 'delete'],
    onAction,
}: ActionColumnProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.includes('view') && (
                    <DropdownMenuItem onClick={() => onAction?.('view', row)}>
                        View
                    </DropdownMenuItem>
                )}
                {actions.includes('edit') && (
                    <DropdownMenuItem onClick={() => onAction?.('edit', row)}>
                        Edit
                    </DropdownMenuItem>
                )}
                {actions.includes('delete') && (
                    <DropdownMenuItem
                        onClick={() => onAction?.('delete', row)}
                        className="text-red-600"
                    >
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
