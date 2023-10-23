import type { ImageWidget } from "apps/admin/widgets.ts";
import TextAboutUs from "$store/islands/AboutUsNewsletter.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface TextAboutUsProps {
  /** @format html */
  text: string;
}

export interface Props {
  srcMobile?: ImageWidget;
  srcDesktop?: ImageWidget;
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  textAboutUs?: TextAboutUsProps;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bg?: "Normal" | "Reverse" | "Image";
    };
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  textAboutUs: {
    text: "",
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
  srcMobile: "",
  srcDesktop: "",
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout, srcMobile, srcDesktop } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const bgColorLayout = layout?.content?.bg;
  const isReverse = bgColorLayout === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <div class="flex flex-col gap-2 text-center text-[#FFFFFF]">
      {title &&
        (
          <h1 class="text-2xl leading-8 lg:leading-10 lg:text-4xl">
            {title}
          </h1>
        )}
      {description &&
        (
          <h2 class="leading-6 lg:leading-8 lg:text-2xl">
            {description}
          </h2>
        )}
    </div>
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4 w-full">
      <div class="flex flex-col lg:flex-row gap-3">
        <input
          class="input input-bordered w-full bg-[#FFFFFF99] text-[#181812]"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`btn bg-transparent border border-[#FFFFFF] text-[#FFFFFF]`}
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {form.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div class="flex flex-col pt-5 mt-10 md:mt-14 xl:container border-t">
      <div>
        {props.textAboutUs && <TextAboutUs {...props.textAboutUs} />}
      </div>
      <div
        class={` mt-4 mb-9 ${
          bordered
            ? isReverse ? "bg-secondary-content" : "bg-secondary"
            : bgLayout
        } ${bordered ? "p-4 lg:p-16" : "p-0"} 
        ${
          bgColorLayout === "Image" && "relative h-[360px]"
        } bg-no-repeat bg-cover bg-center`}
      >
        {bgColorLayout === "Image"
          ? (
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile ?? ""}
                width={70}
                height={70}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ?? ""}
                width={266}
                height={100}
              />
              <img
                class="w-full absolute h-[360px] object-cover z-[-1]"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile ?? ""}
                alt={title ?? "Newsletter"}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          )
          : ""}

        {(!layout?.content?.alignment ||
          layout?.content?.alignment === "Center") && (
          <div
            class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 text-white ${bgLayout}`}
          >
            {headerLayout}
            <div class="flex justify-center">
              {formLayout}
            </div>
          </div>
        )}
        {layout?.content?.alignment === "Left" && (
          <div
            class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
          >
            {headerLayout}
            <div class="flex justify-start">
              {formLayout}
            </div>
          </div>
        )}
        {layout?.content?.alignment === "Side to side" && (
          <div
            class={`container flex flex-col rounded justify-between p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
          >
            {headerLayout}
            <div class="flex justify-center">
              {formLayout}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
