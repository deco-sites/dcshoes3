import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  title?: string
  description?: string;
  cta?: string
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
  layout: {
    alignmentText: "Top" | "Bottom"
  }
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  title: "",
  banners: [
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
      href: "#",
      title: "",
      description: "",
      cta: "",
    },
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
      href: "#",
      title: "",
      description: "",
      cta: "",
    },
  ],
  borderRadius: {
    mobile: "3xl",
    desktop: "3xl",
  },
  itemsPerLine: {
    mobile: 2,
    desktop: 2,
  },
  layout: {
    alignmentText: "Bottom"
  }
};

export default function BannnerGrid(props: Props) {
  const {
    title,
    itemsPerLine,
    borderRadius,
    banners,
    layout,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class="xl:container w-full px-4 md:px-6 lg:md:px-8 mx-auto py-5 md:py-6">
    {title &&
      (
        <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
          <h2 class="text-lg leading-5 font-semibold uppercase">
            {title}
          </h2> 

          <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
        </div>
      )}
    <div
      class={`grid gap-4 md:gap-6 ${
        MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
      } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
    >
      {banners.map(({ href, srcMobile, srcDesktop, alt, title, description, cta }) => (
        <a
          href={href}
          class={`overflow-hidden ${
            RADIUS_MOBILE[borderRadius?.mobile ?? "none"]
          } ${RADIUS_DESKTOP[borderRadius?.desktop ?? "none"]} `}
        >
          { layout.alignmentText === "Top" && (
            <div class="flex flex-col justify-center items-center">
              {title && <h2 class="text-[22px]">{title}</h2>}
              {description && <h2 class="text-sm">{description}</h2>}
              {cta && (
                  <button class="btn text-black bg-white tracking-widest">
                    {cta}
                  </button>
              )}
            </div>
          ) }
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={srcMobile}
              width={160}
              height={160}
            />
            <Source
              media="(min-width: 768px)"
              src={srcDesktop ? srcDesktop : srcMobile}
              width={250}
              height={250}
            />
            <img
              class="w-full"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={srcMobile}
              alt={alt}
              decoding="async"
              loading="lazy"
            />
          </Picture>
          { layout.alignmentText === "Bottom" && (
            <div class="flex flex-col justify-center items-start gap-4 mt-4">
              {title && <h2 class="text-[22px] font-semibold">{title}</h2>}
              {description && <h2 class="text-sm">{description}</h2>}
              {cta && 
                <p class="text-black font-semibold relative inline-block pr-12 transition-all duration-300 hover:pr-0 hover:pl-20 shopNowArrow">{cta}</p>
              }
            </div>
          ) }
        </a>
      ))}
    </div>
  </section>
  );
}
