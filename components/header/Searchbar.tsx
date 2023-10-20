import { headerHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();
  const open = displaySearchPopup.value;

  if (!searchbar) {
    return null;
  }

  return (
    <>
      <div
        class={`${
          open ? "block border-y border-base-200 shadow" : "hidden"
        } absolute left-0 top-0 w-screen z-[99] bg-base-100`}
        style={{ marginTop: headerHeight }}
      >
        {open && (
            <Searchbar {...searchbar} />
        )}
      </div>
    <div class={open ? "fixed top-24 left-0 z-[50] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.4)]" : ""} />
  </>
  );
}

export default SearchbarModal;
