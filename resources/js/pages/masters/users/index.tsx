import { DataTable } from '@/components/data-table';
import { Calendar } from '@/components/ui/calendar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { master } from '@/routes';
import { user } from '@/routes/master';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

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

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

const userColumns: ColumnDef<User, any>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
];

const userData: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Manager' },
];

export default function User() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const handleSelection = (sel) => {
        console.log('Rows selected:', sel);
    };

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
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 px-5 py-3 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        columns={userColumns}
                        data={userData}
                        onRowSelectionChange={handleSelection}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
