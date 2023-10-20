import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import HeaderSections from "$store/components/ui/SectionHeader.tsx";
import Button from "$store/components/ui/Button.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: LiveImage;
  srcDesktop: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  text?: string;
  cta?: string;
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
    mobile?: 0 | 1 | 2 | 3 | 4;
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

const MOBILE_COLUMNS = {
  0: "grid-rows-0",
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
};

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

export default function BannerList({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
  textPosition,
  preload,
}: Props) {
  return (
    <section class="xl:container w-full mx-auto overflow-x-auto md:overflow-visible mt-7">
      <HeaderSections
        title={title}
        alignment={"left"}
      />
      <div
        // style={{
        //     gridTemplateColumns: `repeat(${itemsPerLine
        //       ?.desktop as number}, 1fr)`,
        //   }}
        class={`${
          !itemsPerLine?.mobile && "hidden"
        } px-4 pt-5 mb-12 grid min-w-fit w-[${
          banners.length * 186
        }px] md:w-auto gap-12 md:gap-2 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } md:grid-rows-none  ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map((
          { href, srcMobile, srcDesktop, alt, text, cta },
          index,
        ) => (
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
                width={renderWidth(itemsPerLine.mobile ?? 0)}
                height={150.5}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop}
                width={renderWidth(itemsPerLine.desktop ?? 0)}
                height={150.5}
              />
              <img
                class={`w-full h-[550px] object-cover ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}`}
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
            <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
            {text || cta
              ? (
                <div
                  class={`${
                    textPosition === "Into"
                      ? "absolute bottom-0 pb-4 items-center w-full text-white"
                      : "pt-4 text-black"
                  } flex flex-col p-2 gap-2 tracking-widest`}
                >
                  {text && <h2 class="text-3xl">{text}</h2>}
                  {cta && textPosition !== "Into"
                    ? <p class="text-xl text-black tracking-widest">{cta}</p>
                    : (
                      <Button class="text-2xl text-black bg-white tracking-widest">
                        {cta}
                      </Button>
                    )}
                </div>
              )
              : ""}
          </a>
        ))}
      </div>
    </section>
  );
}
