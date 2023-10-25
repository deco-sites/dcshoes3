import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import ExtraLinks from "$store/components/header/ExtraLinks.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface MenuTopProps {
  label?: AvailableIcons;
  text: string;
  href: string;
}

export interface extraLinkItem {
  text: string;
  href: string;
}

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  extraLinks?: {
    left?: extraLinkItem[];
    right?: extraLinkItem[];
  };

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  menuTop?: MenuTopProps[];
  hide?: {
    account: false | true;
    wishlist: false | true;
    alert: false | true;
    extraLinks: false | true;
  };
}

const DEFAULT_VALUE = {
  hide: {
    account: false,
    wishlist: false,
    alert: false,
    extraLinks: false,
  },
};

function Header({
  alerts,
  searchbar,
  navItems = [],
  logo,
  menuTop = [],
  hide = DEFAULT_VALUE.hide,
  extraLinks,
}: Props) {
  const platform = usePlatform();
  const items = navItems;

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items, logo, menuTop }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            {!hide?.alert && <Alert alerts={alerts} />}
            {!hide?.extraLinks && <ExtraLinks extraLinks={extraLinks} />}
            <Navbar
              items={navItems}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              hide={hide}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
