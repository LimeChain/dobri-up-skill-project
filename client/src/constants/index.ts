export const API_URL =
  (process.env.API_URL ?? "") + (process.env.API_URL_PREFIX ?? "");
export const AUTH_ENDPONIT = "/auth";
export const USER_ENDPOINT = "/user";

export const MENU_ITEMS = [
  { name: "📧 Menu Item 1", href: "/" },
  { name: "💾 Item Menu 2", href: "/" },
  { name: "🖥️ Dev Blog", href: "/dev-blog" },
  { name: "🔍 Item Menu 4", href: "/" },
  { name: "🔒 Menu Item 5", href: "/" },
];
