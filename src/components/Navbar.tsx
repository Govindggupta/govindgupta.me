import Image from "next/image";
import Link from "next/link";
import logoOutline from "@/logos/white_thick_border.svg";
import logoFilled from "@/logos/white_filled.svg";

export default function Navbar() {
  return (
    <nav >
    </nav>
  );
}
<Link
  href="/"
  className="group relative block h-20 w-20"
  aria-label="Go to home"
>
  <Image
    src={logoOutline}
    alt="Govind logo"
    className="absolute inset-0 h-full w-full transition-opacity duration-150 group-hover:opacity-0"
    priority
  />
  <Image
    src={logoFilled}
    alt="Govind logo"
    className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
    priority
  />
</Link>;