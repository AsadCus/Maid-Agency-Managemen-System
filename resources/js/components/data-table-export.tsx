import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Column, Row, Table } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    DownloadIcon,
    FileArchiveIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface DataTableExportProps<TData> {
    table: Table<TData>;
}

export function DataTableExport<TData>({ table }: DataTableExportProps<TData>) {
    const getDataToExport = <TData,>(table: Table<TData>) => {
        const selectedRows = table.getSelectedRowModel().rows as Row<TData>[];
        const rows =
            selectedRows.length > 0
                ? selectedRows.map((row) => row.original)
                : (table.getFilteredRowModel().rows as Row<TData>[]).map(
                      (row) => row.original,
                  );

        const visibleColumns = table
            .getAllLeafColumns()
            .filter(
                (col: Column<TData>) =>
                    col.getIsVisible() &&
                    col.columnDef.meta?.exportable !== false,
            );

        const headers: Record<string, string> = {};
        visibleColumns.forEach((col) => {
            if (col.id) {
                headers[col.id] =
                    typeof col.columnDef.header === 'string'
                        ? col.columnDef.header
                        : col.id;
            }
        });

        const formattedRows = rows.map((row) => {
            const filtered: Record<string, unknown> = {};
            visibleColumns.forEach((col) => {
                if (col.id) {
                    filtered[headers[col.id]] = (
                        row as Record<string, unknown>
                    )[col.id];
                }
            });
            return filtered;
        });

        return { headers, rows: formattedRows };
    };

    const exportToCSV = () => {
        const { rows } = getDataToExport(table);

        const csv = Papa.unparse(rows, {
            header: true,
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `data-export-${new Date().toISOString().split('T')[0]}.csv`,
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const { rows } = getDataToExport(table);

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

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
            `data-export-${new Date().toISOString().split('T')[0]}.xlsx`,
        );
    };

    const exportToPDF = () => {
        const { headers, rows } = getDataToExport(table);

        const head = [Object.values(headers)];

        const body = rows.map((row) => Object.values(row));

        const doc = new jsPDF('l', 'pt', 'a4');
        doc.setFontSize(12);
        doc.text('Exported Data', 40, 30);

        autoTable(doc, {
            head,
            body,
            startY: 50,
            styles: {
                fontSize: 9,
                cellPadding: 4,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                halign: 'left',
            },
            bodyStyles: {
                halign: 'left',
            },
            theme: 'striped',
        });

        doc.save(`data-export-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const exportToJSON = () => {
        const { rows } = getDataToExport(table);

        const json = JSON.stringify(rows, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `data-export-${new Date().toISOString().split('T')[0]}.json`,
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex items-center">
            <div className="hidden text-sm text-muted-foreground md:block">
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
                    <DropdownMenuItem onClick={exportToPDF}>
                        <FileArchiveIcon className="mr-2 h-4 w-4" />
                        Export as PDF
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
