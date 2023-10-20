import { useSignal } from "@preact/signals";

export interface Props {
  /** @format html */
  text?: string
}

export default function TextAboutUs({ text }: Props) {
  const isShow = useSignal(false)
  return (
    <div class="flex flex-col gap-4 pb-10 pt-4">
      <div 
        class={`transition-[max-height] duration-1000 ${isShow.value ? "max-h-[3800px]" : "relative hiddenMiddleTexto"} px-5 my-7`}
      >
        <div dangerouslySetInnerHTML={{ __html: text ?? "" }}  />
        <div class="absolute bottom-0 h-[52px] inline-block w-full left-0" style={{ background: "linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff)" }} />
      </div>
      <div class="flex justify-center">
        <button 
          class="bg-transparent border divide-solid border-black rounded-full w-max" 
          onClick={() => isShow.value = !isShow.value}
        >
          <p class="font-bold text-5xl px-[9px]">{isShow.value ? "-" : "+"}</p>
        </button>
      </div>
    </div>
  )
}
