import { ActionColumn, ActionType } from '@/components/action-column';
import { ColumnFilter } from '@/components/column-filter';
import { DataTable } from '@/components/data-table';
import { createSelectColumn } from '@/components/select-column';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { master } from '@/routes';
import { financialYear } from '@/routes/master';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'sonner';
import { dataFinancialYear, dataYears, schemaFinancialYear } from './data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master',
        href: master().url,
    },
    {
        title: 'Financial Year',
        href: financialYear().url,
    },
];

const actions: ActionType[] = ['add', 'view', 'edit', 'delete'];

const columns: ColumnDef<schemaFinancialYear>[] = [
    createSelectColumn<schemaFinancialYear>(),
    {
        accessorKey: 'id',
        header: 'Id',
        meta: { exportable: true },
    },
    {
        accessorKey: 'year',
        header: 'Year',
        meta: { exportable: true },
        filterFn: 'includesValue',
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <ActionColumn
                row={row}
                actions={actions}
                onAction={(action, row) => {
                    if (action === 'view') {
                        toast('View Financial Year', {
                            description: `Delete Financial Year "${row.original.year}" action triggered`,
                        });
                        console.log('View Financial Year', row.original);
                    }
                    if (action === 'edit') {
                        toast('Edit Financial Year', {
                            description: `Edit Financial Year "${row.original.year}" action triggered`,
                        });
                        console.log('Edit Financial Year', row.original);
                    }
                    if (action === 'delete') {
                        toast('Delete Financial Year', {
                            description: `Delete Financial Year "${row.original.year}" action triggered`,
                        });
                        console.log('Delete Financial Year', row.original);
                    }
                }}
            />
        ),
        meta: { exportable: false },
        enableSorting: false,
        enableHiding: false,
    },
];

const data = dataFinancialYear;

export default function FinancialYear() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Financial Year" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 px-5 py-3 dark:border-sidebar-border">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="m-auto rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 md:aspect-auto dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 md:aspect-auto dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 px-5 py-3 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        columns={columns}
                        data={data}
                        actions={actions}
                        onAction={(action) => {
                            if (action) {
                                toast('Add Financial Year', {
                                    description:
                                        'Add Financial Year action triggered',
                                });
                            }
                        }}
                        initialState={{
                            columnVisibility: { id: false },
                        }}
                        renderFilter={(table) => (
                            <>
                                <ColumnFilter
                                    table={table}
                                    columnId="year"
                                    title="Year"
                                    options={dataYears}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
