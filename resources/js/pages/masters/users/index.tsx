import { DataTable } from '@/components/data-table';
import { RoleFilter } from '@/components/role-filter';
import { selectColumn } from '@/components/select-column';
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

const dColumns: ColumnDef<User, any>[] = [
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
        cell: ({ row }) => row.getValue('role'),
        filterFn: (row, id, value) => {
            return value === 'all' || row.getValue(id) === value;
        },
    },
];

const columns = [selectColumn, ...dColumns];

const data: User[] = [
    { id: 1, name: 'Alice', email: 'alice1@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob2@example.com', role: 'Sales' },
    { id: 3, name: 'Charlie', email: 'charlie3@example.com', role: 'Customer' },
    { id: 4, name: 'David', email: 'david4@example.com', role: 'Supplier' },
    { id: 5, name: 'Eve', email: 'eve5@example.com', role: 'Admin' },
    { id: 6, name: 'Frank', email: 'frank6@example.com', role: 'Sales' },
    { id: 7, name: 'Grace', email: 'grace7@example.com', role: 'Customer' },
    { id: 8, name: 'Heidi', email: 'heidi8@example.com', role: 'Supplier' },
    { id: 9, name: 'Ivan', email: 'ivan9@example.com', role: 'Admin' },
    { id: 10, name: 'Judy', email: 'judy10@example.com', role: 'Sales' },
    { id: 11, name: 'Karl', email: 'karl11@example.com', role: 'Customer' },
    { id: 12, name: 'Leo', email: 'leo12@example.com', role: 'Supplier' },
    { id: 13, name: 'Mona', email: 'mona13@example.com', role: 'Admin' },
    { id: 14, name: 'Nina', email: 'nina14@example.com', role: 'Sales' },
    { id: 15, name: 'Oscar', email: 'oscar15@example.com', role: 'Customer' },
    { id: 16, name: 'Paul', email: 'paul16@example.com', role: 'Supplier' },
    { id: 17, name: 'Quinn', email: 'quinn17@example.com', role: 'Admin' },
    { id: 18, name: 'Rachel', email: 'rachel18@example.com', role: 'Sales' },
    { id: 19, name: 'Sam', email: 'sam19@example.com', role: 'Customer' },
    { id: 20, name: 'Tina', email: 'tina20@example.com', role: 'Supplier' },
    { id: 21, name: 'Uma', email: 'uma21@example.com', role: 'Admin' },
    { id: 22, name: 'Victor', email: 'victor22@example.com', role: 'Sales' },
    { id: 23, name: 'Wendy', email: 'wendy23@example.com', role: 'Customer' },
    { id: 24, name: 'Xander', email: 'xander24@example.com', role: 'Supplier' },
    { id: 25, name: 'Yara', email: 'yara25@example.com', role: 'Admin' },
    { id: 26, name: 'Zane', email: 'zane26@example.com', role: 'Sales' },
    { id: 27, name: 'Aiden', email: 'aiden27@example.com', role: 'Customer' },
    { id: 28, name: 'Bella', email: 'bella28@example.com', role: 'Supplier' },
    { id: 29, name: 'Cody', email: 'cody29@example.com', role: 'Admin' },
    { id: 30, name: 'Diana', email: 'diana30@example.com', role: 'Sales' },
    { id: 31, name: 'Ethan', email: 'ethan31@example.com', role: 'Customer' },
    { id: 32, name: 'Fiona', email: 'fiona32@example.com', role: 'Supplier' },
    { id: 33, name: 'George', email: 'george33@example.com', role: 'Admin' },
    { id: 34, name: 'Holly', email: 'holly34@example.com', role: 'Sales' },
    { id: 35, name: 'Ian', email: 'ian35@example.com', role: 'Customer' },
    {
        id: 36,
        name: 'Jasmine',
        email: 'jasmine36@example.com',
        role: 'Supplier',
    },
    { id: 37, name: 'Kevin', email: 'kevin37@example.com', role: 'Admin' },
    { id: 38, name: 'Lily', email: 'lily38@example.com', role: 'Sales' },
    { id: 39, name: 'Mason', email: 'mason39@example.com', role: 'Customer' },
    { id: 40, name: 'Nora', email: 'nora40@example.com', role: 'Supplier' },
    { id: 41, name: 'Owen', email: 'owen41@example.com', role: 'Admin' },
    { id: 42, name: 'Piper', email: 'piper42@example.com', role: 'Sales' },
    { id: 43, name: 'Quincy', email: 'quincy43@example.com', role: 'Customer' },
    { id: 44, name: 'Ruby', email: 'ruby44@example.com', role: 'Supplier' },
    { id: 45, name: 'Sean', email: 'sean45@example.com', role: 'Admin' },
    { id: 46, name: 'Tara', email: 'tara46@example.com', role: 'Sales' },
    { id: 47, name: 'Umar', email: 'umar47@example.com', role: 'Customer' },
    { id: 48, name: 'Vera', email: 'vera48@example.com', role: 'Supplier' },
    { id: 49, name: 'Will', email: 'will49@example.com', role: 'Admin' },
    { id: 50, name: 'Xenia', email: 'xenia50@example.com', role: 'Sales' },
    { id: 51, name: 'Yusuf', email: 'yusuf51@example.com', role: 'Customer' },
    { id: 52, name: 'Zara', email: 'zara52@example.com', role: 'Supplier' },
    { id: 53, name: 'Aaron', email: 'aaron53@example.com', role: 'Admin' },
    { id: 54, name: 'Bianca', email: 'bianca54@example.com', role: 'Sales' },
    { id: 55, name: 'Caleb', email: 'caleb55@example.com', role: 'Customer' },
    { id: 56, name: 'Daisy', email: 'daisy56@example.com', role: 'Supplier' },
    { id: 57, name: 'Eli', email: 'eli57@example.com', role: 'Admin' },
    { id: 58, name: 'Faith', email: 'faith58@example.com', role: 'Sales' },
    { id: 59, name: 'Gavin', email: 'gavin59@example.com', role: 'Customer' },
    { id: 60, name: 'Hannah', email: 'hannah60@example.com', role: 'Supplier' },
    { id: 61, name: 'Isaac', email: 'isaac61@example.com', role: 'Admin' },
    { id: 62, name: 'Jade', email: 'jade62@example.com', role: 'Sales' },
    { id: 63, name: 'Kyle', email: 'kyle63@example.com', role: 'Customer' },
    { id: 64, name: 'Laura', email: 'laura64@example.com', role: 'Supplier' },
    { id: 65, name: 'Miles', email: 'miles65@example.com', role: 'Admin' },
    { id: 66, name: 'Nadia', email: 'nadia66@example.com', role: 'Sales' },
    { id: 67, name: 'Omar', email: 'omar67@example.com', role: 'Customer' },
    { id: 68, name: 'Paula', email: 'paula68@example.com', role: 'Supplier' },
    { id: 69, name: 'Reid', email: 'reid69@example.com', role: 'Admin' },
    { id: 70, name: 'Sophie', email: 'sophie70@example.com', role: 'Sales' },
    { id: 71, name: 'Trent', email: 'trent71@example.com', role: 'Customer' },
    { id: 72, name: 'Ursula', email: 'ursula72@example.com', role: 'Supplier' },
    { id: 73, name: 'Victor', email: 'victor73@example.com', role: 'Admin' },
    { id: 74, name: 'Willa', email: 'willa74@example.com', role: 'Sales' },
    { id: 75, name: 'Xavier', email: 'xavier75@example.com', role: 'Customer' },
    { id: 76, name: 'Yara', email: 'yara76@example.com', role: 'Supplier' },
    { id: 77, name: 'Zion', email: 'zion77@example.com', role: 'Admin' },
    { id: 78, name: 'Amber', email: 'amber78@example.com', role: 'Sales' },
    {
        id: 79,
        name: 'Brandon',
        email: 'brandon79@example.com',
        role: 'Customer',
    },
    { id: 80, name: 'Clara', email: 'clara80@example.com', role: 'Supplier' },
    { id: 81, name: 'Derek', email: 'derek81@example.com', role: 'Admin' },
    { id: 82, name: 'Elena', email: 'elena82@example.com', role: 'Sales' },
    { id: 83, name: 'Felix', email: 'felix83@example.com', role: 'Customer' },
    { id: 84, name: 'Gloria', email: 'gloria84@example.com', role: 'Supplier' },
    { id: 85, name: 'Harvey', email: 'harvey85@example.com', role: 'Admin' },
    { id: 86, name: 'Isla', email: 'isla86@example.com', role: 'Sales' },
    { id: 87, name: 'Jonas', email: 'jonas87@example.com', role: 'Customer' },
    { id: 88, name: 'Kara', email: 'kara88@example.com', role: 'Supplier' },
    { id: 89, name: 'Liam', email: 'liam89@example.com', role: 'Admin' },
    { id: 90, name: 'Maya', email: 'maya90@example.com', role: 'Sales' },
    { id: 91, name: 'Noah', email: 'noah91@example.com', role: 'Customer' },
    { id: 92, name: 'Olivia', email: 'olivia92@example.com', role: 'Supplier' },
    { id: 93, name: 'Peter', email: 'peter93@example.com', role: 'Admin' },
    { id: 94, name: 'Queenie', email: 'queenie94@example.com', role: 'Sales' },
    { id: 95, name: 'Ryan', email: 'ryan95@example.com', role: 'Customer' },
    { id: 96, name: 'Sophia', email: 'sophia96@example.com', role: 'Supplier' },
    { id: 97, name: 'Thomas', email: 'thomas97@example.com', role: 'Admin' },
    { id: 98, name: 'Uma', email: 'uma98@example.com', role: 'Sales' },
    { id: 99, name: 'Violet', email: 'violet99@example.com', role: 'Customer' },
    { id: 100, name: 'Wyatt', email: 'wyatt100@example.com', role: 'Supplier' },
];

export default function User() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

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
                    <div className="relative overflow-hidden aspect-video md:aspect-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative overflow-hidden aspect-video md:aspect-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 px-5 py-3 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        columns={columns}
                        data={data}
                        renderToolbar={(table) => (
                            <>
                                <RoleFilter table={table} />
                            </>
                        )}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
