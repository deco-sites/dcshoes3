import { useId } from "$store/sdk/useId.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "-translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      // const close = elem.querySelector("[data-button-cc-close]");
      // close &&
      //   close.addEventListener("click", () => elem.classList.add(HIDDEN));
      // elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  title?: string;
  /** @format html */
  text?: string;
  buttons?: {
    allowText: string;
  };
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
    bgColor?: "White" | "Black";
  };
}

const DEFAULT_PROPS = {
  title: "Cookies",
  text:
    "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  buttons: {
    allowText: "Aceitar",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
    bgColor: "White",
  },
};

function CookieConsent(props: Props) {
  const id = useId();
  const { title, text, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          cookiesConsentFont
          transform-gpu -translate-y-[200%] transition fixed top-0 w-screen z-50 lg:flex
          ${layout?.position === "Left" ? "lg:justify-start" : ""}
          ${layout?.position === "Center" ? "lg:justify-center" : ""}
          ${layout?.position === "Right" ? "lg:justify-end" : ""}
        `}
      >
        <div
          class={`
           flex flex-col gap-4 rounded 
          ${
            layout?.bgColor !== "Black"
              ? "border border-base-200 shadow bg-base-100"
              : "bg-black text-white"
          }
          ${
            !layout?.position || layout?.position === "Expanded"
              ? "max-w-[97%] md:max-w-[99%] m-0 p-4 w-full"
              : ` p-4 mx-4 my-2
            ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:w-[520px]"
                  : ""
              }
          `
          }
          ${
            !layout?.content || layout?.content === "Tiled"
              ? "lg:flex-row lg:items-end"
              : ""
          }
          
        `}
        >
          <h3 class="text-xl font-medium">{title}</h3>
          <div class="flex flex-col md:flex-row">
            <div
              class={`flex-auto flex flex-col gap-4 ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:gap-2"
                  : ""
              }`}
            >
              {text && (
                <div
                  class="text-base"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
            </div>
            <button
              class={`btn font-bold mt-4 md:mt-0 ${
                layout?.bgColor !== "Black" ? "" : "bg-[#66bb6a] text-white"
              }`}
              data-button-cc-accept
            >
              {buttons.allowText}
            </button>
          </div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
