import { ActionColumn, ActionType } from '@/components/action-column';
import { ColumnFilter } from '@/components/column-filter';
import { DataTable } from '@/components/data-table';
import { createSelectColumn } from '@/components/select-column';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { maid } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'sonner';
import {
    dataEducationLevels,
    dataMaid,
    dataNationalities,
    dataReligions,
    schemaMaid,
} from './data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Maid',
        href: maid().url,
    },
];

const actions: ActionType[] = ['add', 'view', 'edit', 'delete'];

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const columns: ColumnDef<schemaMaid>[] = [
    createSelectColumn<schemaMaid>(),
    {
        accessorKey: 'id',
        header: 'ID',
        meta: { exportable: true },
    },
    {
        accessorKey: 'name',
        header: 'Name',
        meta: { exportable: true },
    },
    {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        meta: { exportable: true },
        cell: ({ row }) => {
            const dob = row.getValue('date_of_birth') as string;
            return <span>{new Date(dob).toLocaleDateString()}</span>;
        },
    },
    {
        id: 'age',
        header: 'Age',
        meta: { exportable: true },
        cell: ({ row }) => {
            const dob = row.original.date_of_birth;
            return <span>{calculateAge(dob)}</span>;
        },
        accessorFn: (row) => calculateAge(row.date_of_birth),
    },
    {
        accessorKey: 'place_of_birth',
        header: 'Place of Birth',
        meta: { exportable: true },
    },
    {
        accessorKey: 'height',
        header: 'Height (cm)',
        meta: { exportable: true },
    },
    {
        accessorKey: 'weight',
        header: 'Weight (kg)',
        meta: { exportable: true },
    },
    {
        accessorKey: 'nationality',
        header: 'Nationality',
        meta: { exportable: true },
        cell: ({ row }) => (
            <span className="capitalize">{row.getValue('nationality')}</span>
        ),
        filterFn: 'includesValue',
    },
    {
        accessorKey: 'religion',
        header: 'Religion',
        meta: { exportable: true },
        cell: ({ row }) => (
            <span className="capitalize">{row.getValue('religion')}</span>
        ),
        filterFn: 'includesValue',
    },
    {
        accessorKey: 'education_level',
        header: 'Education Level',
        meta: { exportable: true },
        cell: ({ row }) => (
            <span className="capitalize">
                {row.getValue('education_level')}
            </span>
        ),
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
                        toast('View Maid', {
                            description: `View Maid "${row.original.name}" action triggered`,
                        });
                        console.log('View Maid', row.original);
                    }
                    if (action === 'edit') {
                        toast('Edit Maid', {
                            description: `Edit Maid "${row.original.name}" action triggered`,
                        });
                        console.log('Edit Maid', row.original);
                    }
                    if (action === 'delete') {
                        toast('Delete Maid', {
                            description: `Delete Maid "${row.original.name}" action triggered`,
                        });
                        console.log('Delete Maid', row.original);
                    }
                }}
            />
        ),
        meta: { exportable: false },
        enableSorting: false,
        enableHiding: false,
    },
];

const data = dataMaid;

export default function Maid() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Maid" />
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
                                toast('Add Maid', {
                                    description: 'Add Maid action triggered',
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
                                    columnId="nationality"
                                    title="Nationality"
                                    options={dataNationalities}
                                />
                                <ColumnFilter
                                    table={table}
                                    columnId="religion"
                                    title="Religion"
                                    options={dataReligions}
                                />
                                <ColumnFilter
                                    table={table}
                                    columnId="education_level"
                                    title="Education Level"
                                    options={dataEducationLevels}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
