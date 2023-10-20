import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3">
          <div class="w-10 max-h-10">
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={30}
              height={30}
            />
          </div>
          <div class="">
            {logo?.description}
          </div>
        </div>
      )}
    </>
  );
}
