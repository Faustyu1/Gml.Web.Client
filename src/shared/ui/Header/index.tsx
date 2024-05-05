"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_PAGES, DASHBOARD_PAGES } from "@/shared/routes";
import { cn } from "@/shared/lib/utils";
import { BoxesIcon, LogOutIcon, PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { removeStorageProfile, removeStorageTokens } from "@/shared/services";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";
import { ChangeTheme } from "@/features/change-theme";

const menu = [
  {
    item: "Профили",
    paths: [
      {
        icon: <PlusIcon />,
        path: "",
        text: "Создать профиль",
        isDisabled: true,
      },
      {
        icon: <BoxesIcon />,
        path: DASHBOARD_PAGES.PROFILES,
        text: "Список профилей",
        isDisabled: false,
      },
    ],
  },
  {
    item: "Сервера",
    paths: [
      {
        icon: <PlusIcon />,
        path: "",
        text: "Создать сервер",
        isDisabled: true,
      },
      {
        icon: <BoxesIcon />,
        path: DASHBOARD_PAGES.SERVERS,
        text: "Список серверов",
        isDisabled: true,
      },
    ],
  },
  {
    item: "Интеграции",
    paths: [
      {
        icon: <BoxesIcon />,
        path: DASHBOARD_PAGES.INTEGRATIONS,
        text: "Список интеграций",
        isDisabled: false,
      },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const destroySession = () => {
    removeStorageProfile();
    removeStorageTokens();
    router.push(AUTH_PAGES.SIGN_IN);
  };

  return (
    <>
      <nav className="hidden lg:flex flex-col gap-y-8 px-2 py-8 h-full w-[300px]">
        <h3 className="text-xl font-bold mb-4 ml-3">GML Frontend</h3>

        {menu.map(({ item, paths }) => (
          <div key={item} className="flex flex-col gap-y-1">
            <h6 className="text-sm font-bold text-muted-foreground ml-3">{item}</h6>
            {paths.map(({ icon, text, path, isDisabled }) => (
              <div key={text} className="m-0.5">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Link
                      className={cn(
                        "flex items-center gap-x-3 text-base p-2.5 rounded-lg transition-colors hover:bg-muted",
                        pathname === path && "text-foreground bg-muted",
                        isDisabled && "pointer-events-none text-muted-foreground",
                      )}
                      href={path}
                    >
                      {icon}
                      {text}
                    </Link>
                  </TooltipTrigger>
                  {isDisabled && (
                    <TooltipContent className="bg-black w-fit" side="right">
                      <div className="flex flex-col gap-y-1">
                        <h6 className="text-sm font-bold text-white">
                          Сервис временно не работает
                        </h6>
                        <p className="text-sm text-gray-200">Мы уже работаем над этой фичей</p>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-y-4 mt-auto">
          <ChangeTheme />
          <button
            className="flex items-center gap-x-3 text-base p-2.5 rounded-lg transition-colors hover:bg-muted"
            onClick={destroySession}
          >
            <LogOutIcon className="h-4 w-4" />
            Выйти из аккаунта
          </button>
        </div>
      </nav>
      <nav className="lg:hidden flex items-center gap-x-4 p-6 border-b-2 border-gray-50">
        <h3 className="text-xl font-bold">GML Frontend</h3>
        <NavigationMenu>
          <NavigationMenuList>
            {menu.map(({ item, paths }) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuTrigger>{item}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 min-w-64">
                  {paths.map(({ text, path, icon, isDisabled }) => (
                    <Link
                      key={text}
                      className={cn(
                        "flex items-center gap-x-3 text-base p-2.5 rounded-lg transition-colors hover:bg-muted",
                        pathname === path && "text-foreground bg-muted",
                        isDisabled && "pointer-events-none text-muted-foreground",
                      )}
                      href={path}
                    >
                      {icon}
                      {text}
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
