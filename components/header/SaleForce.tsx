import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  promotions: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function SaleForce({ promotions = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-screen bg-secondary gap-6">
        {promotions.map((promotion, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-secondary-content flex justify-center items-center w-screen h-[38px]">
              {promotion}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default SaleForce;
