import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { DownloadIcon, FileSpreadsheetIcon, FileTextIcon } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface DataTableExportProps<TData> {
    table: Table<TData>;
}

export function DataTableExport<TData>({ table }: DataTableExportProps<TData>) {
    const exportToCSV = () => {
        const selectedRows = table.getSelectedRowModel().rows;

        const dataToExport =
            selectedRows.length > 0
                ? selectedRows.map((row) => row.original)
                : table.getFilteredRowModel().rows.map((row) => row.original);

        const csv = Papa.unparse(dataToExport, {
            header: true,
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `payments-export-${new Date().toISOString().split('T')[0]}.csv`,
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const selectedRows = table.getSelectedRowModel().rows;

        const dataToExport =
            selectedRows.length > 0
                ? selectedRows.map((row) => row.original)
                : table.getFilteredRowModel().rows.map((row) => row.original);

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');

        const cols = [
            { wch: 10 },
            { wch: 20 },
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
        ];

        worksheet['!cols'] = cols;

        XLSX.writeFile(
            workbook,
            `payments-export-${new Date().toISOString().split('T')[0]}.xlsx`,
        );
    };

    const exportToJSON = () => {
        const selectedRows = table.getSelectedRowModel().rows;

        const dataToExport =
            selectedRows.length > 0
                ? selectedRows.map((row) => row.original)
                : table.getFilteredRowModel().rows.map((row) => row.original);

        const json = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `payments-export-${new Date().toISOString().split('T')[0]}.json`,
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex items-center">
            <div className="text-sm text-muted-foreground">
                {table.getSelectedRowModel().rows.length > 0 && (
                    <span className="mr-2">
                        {table.getSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected
                    </span>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportToCSV}>
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToExcel}>
                        <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
                        Export as Excel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={exportToJSON}>
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Export as JSON
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
