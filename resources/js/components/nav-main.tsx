import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    useSidebar,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { state, isMobile } = useSidebar();

    const renderSubMenu = (subItems: NavItem[]) => {
        return (
            <SidebarMenuSub>
                {subItems.map((subItem) => {
                    const hasNested = (subItem.subItems?.length ?? 0) > 0;
                    const isActive = page.url.startsWith(
                        typeof subItem.href === 'string'
                            ? subItem.href
                            : subItem.href.url,
                    );
                    const subActive = subItem.subItems?.some((child) =>
                        page.url.startsWith(
                            typeof child.href === 'string'
                                ? child.href
                                : child.href.url,
                        ),
                    );

                    if (!hasNested) {
                        return (
                            <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={{ children: subItem.title }}
                                >
                                    <Link href={subItem.href} prefetch>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <Collapsible
                            key={subItem.title}
                            defaultOpen={isActive || subActive}
                            className="group/collapsible-item"
                        >
                            <SidebarMenuItem className="flex items-center">
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive || subActive}
                                    tooltip={{ children: subItem.title }}
                                    className="flex-1"
                                >
                                    <Link
                                        href={subItem.href}
                                        prefetch
                                        className="flex items-center gap-2"
                                    >
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuButton>

                                <CollapsibleTrigger asChild>
                                    <button
                                        type="button"
                                        className="ml-2 rounded p-1 hover:bg-accent"
                                    >
                                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-item:rotate-90" />
                                    </button>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>

                            <CollapsibleContent>
                                {renderSubMenu(subItem.subItems ?? [])}
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </SidebarMenuSub>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasSubItems =
                        item.subItems && item.subItems.length > 0;
                    const isActive = page.url.startsWith(
                        typeof item.href === 'string'
                            ? item.href
                            : item.href.url,
                    );
                    const subActive = item.subItems?.some((subItem) =>
                        page.url.startsWith(
                            typeof subItem.href === 'string'
                                ? subItem.href
                                : subItem.href.url,
                        ),
                    );

                    if (!hasSubItems) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }

                    if (state === 'collapsed' && !isMobile) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            isActive={isActive || subActive}
                                            tooltip={{ children: item.title }}
                                        >
                                            {item.icon && <item.icon />}
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="right"
                                        align="start"
                                    >
                                        {(item.subItems ?? []).map(
                                            (subItem) => (
                                                <DropdownMenuItem
                                                    key={subItem.title}
                                                    asChild
                                                >
                                                    <Link
                                                        href={subItem.href}
                                                        prefetch
                                                    >
                                                        {subItem.icon && (
                                                            <subItem.icon className="mr-2" />
                                                        )}
                                                        {subItem.title}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ),
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <Collapsible
                            key={item.title}
                            defaultOpen={isActive || subActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem className="flex items-center">
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive || subActive}
                                    tooltip={{ children: item.title }}
                                    className="flex-1"
                                >
                                    <Link
                                        href={item.href}
                                        prefetch
                                        className="flex items-center gap-2"
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>

                                <CollapsibleTrigger asChild>
                                    <button
                                        type="button"
                                        className="ml-2 rounded p-1 hover:bg-accent"
                                    >
                                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </button>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>

                            <CollapsibleContent>
                                {renderSubMenu(item.subItems ?? [])}
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
