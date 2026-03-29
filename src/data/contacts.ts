export interface ContactItem {
  label: string
  value: string
  href: string
  iconDark: string
  iconLight: string
  singleVariant: boolean
  useLucide?: boolean
  newTab: boolean
}

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "contact@govindgupta.me",
    href: "mailto:contact@govindgupta.me",
    iconDark: "/icons/contact/gmail.svg",
    iconLight: "/icons/contact/gmail.svg",
    singleVariant: true,
    newTab: false,
  },
  {
    label: "GitHub",
    value: "github.com/govindggupta",
    href: "https://github.com/govindggupta",
    iconDark: "/icons/contact/github-dark.svg",
    iconLight: "/icons/contact/github-light.svg",
    singleVariant: false,
    newTab: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/govindggupta",
    href: "https://linkedin.com/in/govindggupta",
    iconDark: "/icons/contact/linkedin.svg",
    iconLight: "/icons/contact/linkedin.svg",
    singleVariant: true,
    newTab: true,
  },
  {
    label: "X (Twitter)",
    value: "x.com/3g_g0vind",
    href: "https://x.com/3g_g0vind",
    iconDark: "/icons/contact/x-dark.svg",
    iconLight: "/icons/contact/x-light.svg",
    singleVariant: false,
    newTab: true,
  },
]

export default contacts
