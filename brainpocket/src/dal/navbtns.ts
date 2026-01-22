type  navLinkBtn = {
    id: number
    link: string
    name: string
    icon: string
}
type navbarLinks = Array<navLinkBtn>

export const navbarLinks: navbarLinks = [
  {
    id: 1,
    link: "/profile",
    name: "Профиль",
    icon: "/icons/profile.png",
  },
  {
    id: 2,
    link: "/dialogs",
    name: "Диалоги",
    icon: "/icons/dialogs.png",
  },
  {
    id: 3,
    link: "/news",
    name: "Новости",
    icon: "/icons/news.png",
  },
  {
    id: 4,
    link: "/music",
    name: "Музыка",
    icon: "/icons/music.png",
  },
  {
    id: 5,
    link: "/settings",
    name: "Настройки",
    icon: "/icons/settings.png",
  },
  {
    id: 6,
    link: "/users",
    name: "Пользователи",
    icon: "/icons/users.png",
  },
];
