import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import HeaderSections from "deco-sites/storefront/components/ui/SectionHeader.tsx";
import Button from "deco-sites/storefront/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  title?: string;
  description?: string;
  cta?: string;
}

export interface BannerProps {
  banner: Banner
  textPosition: "Top" | "Bottom" | "Into";
  preload?: boolean;
  borderRadius: {
    mobile?: BorderRadius;
    desktop?: BorderRadius;
  };
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
    /** @default 3 */
    desktop?: 0 | 1 | 2 | 3 | 4;
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
  textPosition: "Top" | "Bottom" | "Into";
  preload?: boolean;
}

const DESKTOP_COLUMNS = {
  0: "md:grid-cols-0",
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
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

function renderWidth(itemsPerLine: number) {
  if (itemsPerLine === 4) {
    return 81.67;
  } else if (itemsPerLine === 3) {
    return 115.5;
  } else if (itemsPerLine === 2) {
    return 135;
  } else {
    return 0;
  }
}

export function BannerItem({
  banner: { href, srcMobile, srcDesktop, alt, title, description, cta },
  textPosition,
  preload,
  borderRadius,
  index
}: BannerProps) {
  return (
    <a
      href={href}
      class={`relative w-[98%] ${
        textPosition === "Top"
          ? "flex-col-reverse"
          : textPosition === "Bottom" && "flex-col"
      }  `}
    >
      <Picture preload={index === 0 && preload}>
        <Source
          media="(max-width: 767px)"
          src={srcMobile}
          width={110}
          height={110}
        />
        <Source
          media="(min-width: 768px)"
          src={srcDesktop}
          width={150}
          height={150}
        />
        <img
          class={`w-full h-[350px] object-cover ${
            RADIUS_MOBILE[borderRadius?.mobile ?? "none"]
          } ${RADIUS_DESKTOP[borderRadius?.desktop ?? "none"]}`}
          sizes="(max-width: 640px) 100vw, 30vw"
          src={srcMobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
      <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
      {textPosition === "Into"
        ? (
          <div class="absolute bottom-0 pb-4 items-center w-full text-white flex flex-col p-2 gap-2 tracking-widest">
            {title && <h2 class="text-3xl">{title}</h2>}
            {description && <h2 class="text-sm">{description}</h2>}
            {cta && (
              <Button class="text-2xl text-black bg-white tracking-widest">
                {cta}
              </Button>
            )}
          </div>
        )
        : (
          <div class="pt-4 text-black flex flex-col p-2 gap-2 tracking-widest">
            {title && <h2 class="text-[22px] font-semibold">{title}</h2>}
            {description && <h2 class="text-sm">{description}</h2>}
            {cta && (
              <p class="text-black font-semibold relative inline-block pr-12 transition-all duration-300 hover:pr-0 hover:pl-20 shopNowArrow">
                {cta}
              </p>
            )}
          </div>
        )}
    </a>
  );
}

export default function BannerList({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
  textPosition,
  preload = false,
}: Props) {
  return (
    <section class="xl:container w-full mx-auto overflow-x-auto md:overflow-visible mt-3 md:mt-7">
      <HeaderSections
        title={title}
        alignment={"left"}
      />
      <div
        class={`hidden px-4 pt-5 mb-12 md:grid min-w-fit
        w-[${
          banners.length * 186
        }px] md:w-auto gap-12 md:gap-2  md:grid-rows-none  
        ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map((
          banner,
          index,
        ) => (
          <BannerItem
            banner={banner}
            preload={preload}
            index={index}
            textPosition={textPosition}
            borderRadius={borderRadius}
          />
        ))}
      </div>
      <div class="grid md:hidden grid-cols-[28px_1fr_28px] my-5">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
          {banners.map((banner, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                banner={banner}
                preload={preload}
                index={index}
                textPosition={textPosition}
                borderRadius={borderRadius}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>
    </section>
  );
}
