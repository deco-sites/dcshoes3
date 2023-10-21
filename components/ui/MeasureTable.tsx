import Modal from "./Modal.tsx";
import { useSignal } from "@preact/signals";
import Button from "deco-sites/storefront/components/ui/Button.tsx";
import { JSX } from "preact/jsx-runtime";

export default function MeasureTable({ children }: { children: JSX.Element}) {
  const open = useSignal(false)
  return (
    <>
      <Button
        class="border-none bg-transparent underline text-sm font-semibold"
        onClick={() => open.value = !open.value}
      >
        Confira a tabela de medidas
      </Button>
      <Modal
        class="max-w-2xl "
        open={open.value}

      >
        { children }
      </Modal>
    </>
  )
}
