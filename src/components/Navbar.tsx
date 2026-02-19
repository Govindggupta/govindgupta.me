import Image from "next/image";
import Link from "next/link";
import logoOutlineLight from "@/logos/black_thick_border.svg";
import logoFilledLight from "@/logos/black_filled.svg";
import logoOutline from "@/logos/white_thick_border.svg";
import logoFilled from "@/logos/white_filled.svg";

export default function Navbar() {
  return (
    <nav className="mb-4 screen-line-after screen-line-before p-1">
      <div className="h-18 px-2 bg-white dark:bg-black flex items-center justify-between rounded-md">
        <Link
          href="/"
          className="group relative block h-18 w-18"
          aria-label="Go to home"
        >
          <Image
            src={logoOutlineLight}
            alt="Govind logo"
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:hidden"
            priority
          />
          <Image
            src={logoFilledLight}
            alt="Govind logo"
            className="absolute inset-0 h-full w-full transition-opacity duration-150 group-hover:opacity-0 dark:hidden"
            priority
          />
          <Image
            src={logoOutline}
            alt="Govind logo"
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100 hidden dark:block"
            priority
          />
          <Image
            src={logoFilled}
            alt="Govind logo"
            className="absolute inset-0 h-full w-full transition-opacity duration-150 group-hover:opacity-0 hidden dark:block"
            priority
          />
        </Link>

        <div className="pr-4">
          <ul className="flex gap-4">
            <li>
              <Link
                href="/about"
                className="text-sm font-medium text-black dark:text-white hover:underline transition-all duration-150"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-sm font-medium text-black dark:text-white hover:underline transition-all duration-150"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-black dark:text-white hover:underline transition-all duration-150"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
