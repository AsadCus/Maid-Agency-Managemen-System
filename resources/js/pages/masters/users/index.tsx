import { ActionColumn, ActionType } from '@/components/action-column';
import { ColumnFilter } from '@/components/column-filter';
import { DataTable } from '@/components/data-table';
import { createSelectColumn } from '@/components/select-column';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { master } from '@/routes';
import { user } from '@/routes/master';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';
import { dataRoles, dataUser, schemaUser } from './data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master',
        href: master().url,
    },
    {
        title: 'User',
        href: user().url,
    },
];

const actions: ActionType[] = ['add', 'view', 'edit', 'delete'];

const columns: ColumnDef<schemaUser>[] = [
    createSelectColumn<schemaUser>(),
    {
        accessorKey: 'id',
        header: 'Id',
        meta: { exportable: true },
    },
    {
        accessorKey: 'name',
        header: 'Name',
        meta: { exportable: true },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        meta: { exportable: true },
    },
    {
        accessorKey: 'role',
        header: 'Role',
        meta: { exportable: true },
        cell: ({ row }) => (
            <span className="capitalize">{row.getValue('role')}</span>
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
                        toast('View User', {
                            description: `Delete User "${row.original.name}" action triggered`,
                        });
                        console.log('View User', row.original);
                    }
                    if (action === 'edit') {
                        toast('Edit User', {
                            description: `Edit User "${row.original.name}" action triggered`,
                        });
                        console.log('Edit User', row.original);
                    }
                    if (action === 'delete') {
                        toast('Delete User', {
                            description: `Delete User "${row.original.name}" action triggered`,
                        });
                        console.log('Delete user', row.original);
                    }
                }}
            />
        ),
        meta: { exportable: false },
        enableSorting: false,
        enableHiding: false,
    },
];

const data = dataUser;

export default function User() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
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
                                toast('Add User', {
                                    description: 'Add User action triggered',
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
                                    columnId="role"
                                    title="Role"
                                    options={dataRoles}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
