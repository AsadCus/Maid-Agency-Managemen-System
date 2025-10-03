import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import {
    ChevronDownIcon,
    RefreshCcwIcon,
    Rows2Icon,
    Rows3Icon,
    Rows4Icon,
    SearchIcon,
    Settings2Icon,
} from 'lucide-react';

interface DataTableSettingsProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    density: string | undefined;
    setDensity: (value: string) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    renderToolbar?: (table: Table<TData>) => React.ReactNode;
}

export function DataTableSettings<TData>({
    table,
    globalFilter,
    setGlobalFilter,
    density,
    setDensity,
    searchQuery,
    setSearchQuery,
    renderToolbar,
}: DataTableSettingsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Settings2Icon className="h-4 w-4" />
                    Settings
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-full max-w-[600px] p-4"
                align="start"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="space-y-1">
                            <DropdownMenuLabel>Search</DropdownMenuLabel>
                            <div className="relative">
                                <Input
                                    placeholder="Search..."
                                    value={globalFilter ?? ''}
                                    onChange={(e) =>
                                        setGlobalFilter(e.target.value)
                                    }
                                    className="w-full pl-8"
                                />
                                <SearchIcon className="absolute inset-y-0 left-2 my-auto h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Columns */}
                        <div className="space-y-1 border-t">
                            <DropdownMenuLabel>Columns</DropdownMenuLabel>
                            <div className="relative">
                                <Input
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-8"
                                    placeholder="Search columns"
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                                <SearchIcon className="absolute inset-y-0 left-2 my-auto h-4 w-4 text-muted-foreground" />
                            </div>

                            <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border p-1">
                                {table
                                    .getAllLeafColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        if (
                                            searchQuery &&
                                            !column.id
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase(),
                                                )
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value,
                                                    )
                                                }
                                                onSelect={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-1 w-full justify-start"
                                onClick={() => {
                                    table.resetColumnVisibility();
                                    setSearchQuery('');
                                }}
                            >
                                <RefreshCcwIcon className="mr-2 h-4 w-4" />{' '}
                                Reset Columns
                            </Button>
                        </div>

                        {/* Density */}
                        <div className="space-y-1 border-t">
                            <DropdownMenuLabel>Density</DropdownMenuLabel>
                            <Select value={density} onValueChange={setDensity}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Density" />
                                </SelectTrigger>
                                <SelectContent>
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
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Filters */}
                    {renderToolbar && (
                        <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-4">
                            <DropdownMenuLabel>Filters</DropdownMenuLabel>
                            {renderToolbar(table)}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
