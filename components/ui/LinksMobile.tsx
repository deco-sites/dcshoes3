import Icon from "$store/components/ui/Icon.tsx";

export interface LinkItem {
  text: string;
  href: string;
}

export interface Props {
  /**
   * @title Mobile Links
   * @description The links only render on mobile
   */
  links?: LinkItem[];
}

export default function LinksMobile(
  { links = [{ text: "Novidades", href: "#" }] }: Props,
) {
  return (
    <div class="block md:hidden">
      <div class="flex flex-col py-6">
        {links?.map(({ text, href }, index) => (
          <div
            key={index}
            class="py-4 px-3 border-y divide-solid first:font-bold font-semibold last:text-[#FA0505]"
          >
            <a href={href} class="flex justify-between">
              <span class="text-sm">{text}</span>
              <Icon
                class="text-[#777777]"
                size={24}
                id="ChevronRight"
                strokeWidth={3}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
