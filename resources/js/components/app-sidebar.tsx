import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, maid, master, supplier } from '@/routes';
import { branch, financialYear, user } from '@/routes/master';
import {
    admin,
    customer,
    sales,
    supplier as userSupplier,
} from '@/routes/master/user';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Master',
        href: master(),
        icon: LayoutGrid,
        subItems: [
            {
                title: 'User',
                href: user(),
                icon: LayoutGrid,
                subItems: [
                    {
                        title: 'Admin',
                        href: admin(),
                        icon: LayoutGrid,
                    },
                    {
                        title: 'Sales',
                        href: sales(),
                        icon: LayoutGrid,
                    },
                    {
                        title: 'Customer',
                        href: customer(),
                        icon: LayoutGrid,
                    },
                    {
                        title: 'Supplier',
                        href: userSupplier(),
                        icon: LayoutGrid,
                    },
                ],
            },
            {
                title: 'Branch',
                href: branch(),
                icon: LayoutGrid,
            },
            {
                title: 'Financial Year',
                href: financialYear(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Supplier',
        href: supplier(),
        icon: LayoutGrid,
    },
    {
        title: 'Maid',
        href: maid(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
