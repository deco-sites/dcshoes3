import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  button?: {
    text: string;
  };
}

function ContactForm({ button }: Props) {
  return (
    <div>
      {
        /* <div
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-6 right-6 z-40"
      aria-label="Contact Form"
    >
      <button
        class="bg-[#45D268] text-white p-2 rounded-full shadow-lg"
        aria-label="Contact Form"
        onClick={}
      >
        <Icon id="" size={32} stroke="0.01" />
      </button>
    */
      }
    </div>
  );
}

export default ContactForm;
