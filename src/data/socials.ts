import { Github, Linkedin } from "lucide-react"

import { DiscordIcon } from "@/components/ui/icons/DiscordIcon"
import { XIcon } from "@/components/ui/icons/XIcon"
import type { SocialLink } from "@/types"

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/govindggupta",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/govindggupta",
    icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/3g_g0vind",
    icon: XIcon,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/govind_5649",
    icon: DiscordIcon,
  },
]
