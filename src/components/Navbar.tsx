import MobileNavMenu from "./navbar/MobileNavMenu";
import BrandLogo from "./navbar/BrandLogo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import SearchButton from "./navbar/SearchButton";
import { navigationItems } from "./navbar/navigationItems";
import ThemeModeToggle from "./ThemeModeToggle";
import VerticalBar from "./ui/VerticalBar";

export default function Navbar() {
  return (
      <nav className="h-15 mb-3 screen-line-before screen-line-after p-1">
        <div className="flex h-full items-center justify-between rounded-sm border border-border bg-background p-1">
          <BrandLogo />

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <DesktopNavLinks items={navigationItems} />
            <SearchButton />
            <VerticalBar className="hidden md:block" />
            <ThemeModeToggle />
            <MobileNavMenu items={navigationItems} />
          </div>
        </div>
      </nav>
  );
}
