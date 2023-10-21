/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCardRow from "$store/components/product/ProductCardRow.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class="w-screen grid gap-8 container px-4 py-6 overflow-y-hidden relative"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join">
        <Button
          type="submit"
          class="join-item btn-square bg-transparent border-none"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input flex-grow border-none bg-transparent focus:outline-none"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="button join-item"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={36} strokeWidth={2} />
        </Button>
        <div class={`${hasProducts ? "absolute flex" : "hidden"} absolute bottom-[10px] w-[98%] flex justify-center`}>
          <Button type="submit" class="bg-black py-4 text-white">VER TUDO</Button>
        </div>
      </form>

      {notFound
        ? (
          <div class="flex flex-col gap-4 w-full">
            <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        )
        : (
        <div
          class="overflow-y-scroll"
        >
          <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
            <div 
              class={hasTerms ? "flex flex-col gap-6" : "hidden"}
            >
              <span
                class="font-medium text-xl"
                role="heading"
                aria-level={3}
              >
                MAIS VENDIDOS
              </span>
              <ul id="search-suggestion" class="flex flex-col gap-6">
                {searches.map(({ term }) => (
                  <li>
                    <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                      <span>
                        <Icon
                          id="ChevronRight"
                          size={20}
                          strokeWidth={0.01}
                        />
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: term }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div 
              class={hasProducts
                ? "flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden"
                : "hidden"}
            >
              <span
                class="font-medium text-xl"
                role="heading"
                aria-level={3}
              >
                PRODUTOS
              </span>
              <div class="flex flex-row flex-wrap pb-8">
                {products.map((product, index) => (
                  <div class="max-w-[370px]">
                    <ProductCardRow product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
