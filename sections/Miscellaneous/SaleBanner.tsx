import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface SaleBannerItem {
  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTMLWidget;

  link?: {
    /**
     * @title Link Text
     * @default button
     */
    text: string;
    /**
     * @title Link href
     * @default #
     */
    href: string;
  };

}

export interface Props {
  saleBanner: SaleBannerItem[];
    /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  layout?: {
    textPosition?: "Center" | "Left";
  };
}


function Buttons() {
  return (
    <>
      <div class="hidden md:flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn-circle text-black">
          <Icon
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="hidden md:flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn-circle text-black">
          <Icon
            size={30}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

export default function SaleBanner({
  saleBanner = [
    {
      text: "Time left for a campaign to end wth a link",
      link: { text: "Click me", href: "/hello" }
    }
  ],
  layout = { textPosition: "Center" },
  interval
}: Props) {
  const id = useId()
  return (
    <div id={id} class="border-t border-b border-black">
        <div class="container grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1px_1fr_1px]">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
          { saleBanner.map(({ link, text }: SaleBannerItem, index: number) => (
            <Slider.Item
              index={index}
              class={`flex ${layout.textPosition === "Center" ? "justify-center items-center" : "justify-start items-center"} w-full gap-4 carousel-item`}
            >
              <div class="flex py-2 md:py-0 flex-col md:flex-row items-center">
                <span 
                  class="font-bold text-sm mr-2"
                  dangerouslySetInnerHTML={{ __html: text ?? "" }}
                />
                <a class="text-sm underline"
                  href={link?.href}
                >
                  {link?.text}
                </a>
              </div>
            </Slider.Item>
          )) }
        </Slider>
        <Buttons />
        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </div>
  )
}
