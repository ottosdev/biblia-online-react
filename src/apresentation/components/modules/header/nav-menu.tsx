import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/apresentation/components/ui/navigation-menu";

import { ReactNode, forwardRef } from "react";
import { Link } from "react-router-dom";
import { cadastro, livros } from "./menus";

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cadastro</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {cadastro.map((element) => (
                <ListItem
                  key={element.title}
                  title={element.title}
                  icon={element.icon}
                  href={element.href}
                >
                  {element.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Livros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {livros.map((element) => (
                <ListItem
                  key={element.title}
                  title={element.title}
                  icon={element.icon}
                  href={element.href}
                >
                  {element.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, icon, href, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href ? href : "/"}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex gap-2 items-center">
              <div className="flex-shrink-0">{icon}</div>
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
