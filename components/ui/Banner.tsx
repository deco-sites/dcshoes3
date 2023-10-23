import Button from "$store/components/ui/Button.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "$store/components/ui/SectionHeader.tsx";

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
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
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
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  fullWidth?: false | true;
  banners: Banner[];
}

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

export default function Banner({
  title,
  borderRadius,
  banners = [],
  fullWidth,
}: Props) {
  return (
    <section
      class={`xl:container w-full mx-auto py-2 md:pb-12 ${
        fullWidth ? "px-0" : "px-5"
      }`}
    >
      <Header
        title={title || ""}
        description={""}
        fontSize={"Large"}
        alignment={"center"}
      />
      <div
        class={`grid gap-4 md:gap-6 grid-cols-1`}
      >
        {banners.map(({ srcMobile, srcDesktop, alt, action }) => (
          <a
            href={action?.href ?? "#"}
            class={`overflow-hidden relative ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture preload={false}>
              <Source
                media="(max-width: 767px)"
                src={srcMobile ?? ""}
                width={152}
                height={68}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ?? ""}
                width={384}
                height={168}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile ?? ""}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
            <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
            {action && (
              <div class="absolute h-min top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 p-4 rounded">
                <span class="text-6xl font-medium text-base-100">
                  {action.title}
                </span>
                <span class="font-medium text-xl text-base-100">
                  {action.subTitle}
                </span>
                <Button>{action.label}</Button>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
