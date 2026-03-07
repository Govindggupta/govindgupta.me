import Image from "next/image";
import Link from "next/link";
import logoOutlineLight from "@/logos/black_thick_border.svg";
import logoFilledLight from "@/logos/black_filled.svg";
import logoOutline from "@/logos/white_thick_border.svg";
import logoFilled from "@/logos/white_filled.svg";

export default function BrandLogo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center" aria-label="Go to home">
      <span className="relative block h-[3.25rem] aspect-[15/16] overflow-hidden rounded-sm">
        <Image
          src={logoOutlineLight}
          alt="Govind logo"
          className="theme-logo-light absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          priority
        />
        <Image
          src={logoFilledLight}
          alt="Govind logo"
          className="theme-logo-light absolute inset-0 h-full w-full transition-opacity duration-150 group-hover:opacity-0"
          priority
        />
        <Image
          src={logoOutline}
          alt="Govind logo"
          className="theme-logo-dark absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          priority
        />
        <Image
          src={logoFilled}
          alt="Govind logo"
          className="theme-logo-dark absolute inset-0 h-full w-full transition-opacity duration-150 group-hover:opacity-0"
          priority
        />
      </span>
    </Link>
  );
}
