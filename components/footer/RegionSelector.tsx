import Icon from "$store/components/ui/Icon.tsx";
import type { RegionOptions } from "./Footer.tsx";

export default function RegionSelector(
  { content }: { content?: RegionOptions },
) {
  return (
    <>
      {content && content.text && content.href &&
        (
          <div class="flex">
            <a href={content.href} class="flex flex-row items-center">
              <Icon id={content?.label ?? "Global"} size={30} />
              <p class="text-xs font-semibold ml-2">{content.text}</p>
            </a>
          </div>
        )}
    </>
  );
}
