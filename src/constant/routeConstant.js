import Home from "../assets/icons/SidebarIcon/Home.svg";
import Chat from "../assets/icons/SidebarIcon/Chat.svg";
import Books from "../assets/icons/SidebarIcon/Books.svg";
import GetHelp from "../assets/icons/SidebarIcon/Get-help.svg";
import Settings from "../assets/icons/SidebarIcon/Settings.svg";
import Calendar from "../assets/icons/SidebarIcon/Calendar.svg";
import Brainstorm from "../assets/icons/SidebarIcon/Brainstorm.svg";

import UnSelectedHome from "../assets/icons/SidebarIcon/UnSelectedHome.svg";
import SharedWorkIcon from "../assets/icons/SidebarIcon/dashboard-icon.svg";
import UnSelectedChat from "../assets/icons/SidebarIcon/UnSelectedChat.svg";
import UnSelectedBooks from "../assets/icons/SidebarIcon/UnSelectedBooks.svg";
import UnSelectedGetHelp from "../assets/icons/SidebarIcon/UnSelectedGetHelp.svg";
import UnSelectedSettings from "../assets/icons/SidebarIcon/UnSelectedSettings.svg";
import UnSelectedCalendar from "../assets/icons/SidebarIcon/UnSelectedCalendar.svg";
import UnSelectedBrainstorm from "../assets/icons/SidebarIcon/UnSelectedBrainstorm.svg";

export const AUTHENTICATED_ROUTES = {
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  CALENDAR: "/calendar",
  BOOKS: "/books_series",
  SHARED_WORKS: "/shared_works",
  BRAINSTORM: "/brain-storm",
  SETTING: "/settings",
  PROFILE_SETTING: "/profile_Setting",
  GET_HELP: "/get-help",
  OUT_LINE: "/out-line",
  PLOT_LINE: "/plot-line",
  TIME_LINE: "/time-line",
  FIRST_INDEX: "/series",
};

export const UNAUTHENTICATED_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const ROUTES = {
  ADMIN: [
    {
      route: AUTHENTICATED_ROUTES.DASHBOARD,
      label: "Home",
      selectedIcon: Home,
      unSelectedIcon: UnSelectedHome,
    },
    {
      route: AUTHENTICATED_ROUTES.CHAT,
      label: "Chat",
      selectedIcon: Chat,
      unSelectedIcon: UnSelectedChat,
    },
    {
      route: AUTHENTICATED_ROUTES.SHARED_WORKS,
      label: "Shared",
      selectedIcon: Books,
      unSelectedIcon: SharedWorkIcon,
    },
    {
      route: AUTHENTICATED_ROUTES.CALENDAR,
      label: "Calendar",
      selectedIcon: Calendar,
      unSelectedIcon: UnSelectedCalendar,
    },
    {
      route: AUTHENTICATED_ROUTES.BOOKS,
      label: "Books",
      selectedIcon: Books,
      unSelectedIcon: UnSelectedBooks,
    },
    {
      route: AUTHENTICATED_ROUTES.BRAINSTORM,
      label: "Brainstorm",
      selectedIcon: Brainstorm,
      unSelectedIcon: UnSelectedBrainstorm,
    },
    {
      route: AUTHENTICATED_ROUTES.OUT_LINE,
      label: "Outline",
      selectedIcon: null,
      unSelectedIcon: null,
    },
    {
      route: AUTHENTICATED_ROUTES.PLOT_LINE,
      label: "Plotline",
      selectedIcon: null,
      unSelectedIcon: null,
    },
    {
      route: AUTHENTICATED_ROUTES.TIME_LINE,
      label: "Timeline",
      selectedIcon: null,
      unSelectedIcon: null,
    },
  ],

  OTHER: [
    {
      route: AUTHENTICATED_ROUTES.SETTING,
      label: "Settings",
      selectedIcon: Settings,
      unSelectedIcon: UnSelectedSettings,
    },
    {
      route: AUTHENTICATED_ROUTES.GET_HELP,
      label: "Get Help",
      selectedIcon: GetHelp,
      unSelectedIcon: UnSelectedGetHelp,
    },
  ],

  AUTH: [
    { route: UNAUTHENTICATED_ROUTES.SIGN_UP, label: "Sign Up" },
    { route: UNAUTHENTICATED_ROUTES.SIGN_IN, label: "Sign In" },
  ],
};
