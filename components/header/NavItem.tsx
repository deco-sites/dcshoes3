import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center last:text-[#FA0505]">
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline hover:pb-2 hover:text-[#777777] text-sm uppercase font-semibold">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen text-[#333333]"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <div class="fixed z-[-1] pointer-events-none bg-[rgba(0,0,0,0.4)] h-full w-screen" />
            <div class="bg-base-100 w-full shadow">
              {image?.src && (
                <Image
                  class="p-6"
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={332}
                  loading="lazy"
                />
              )}
              <ul class="flex items-start justify-center gap-6">
                {children.map((node) => (
                  <li class="p-6">
                    <a class="hover:underline" href={node.href}>
                      <span class="text-sm uppercase font-semibold">{node.label}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a class="hover:underline" href={leaf.href}>
                            <span class="text-xs">{leaf.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
