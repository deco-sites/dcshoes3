interface extraLinkItem {
  text: string;
  href: string;
}

interface ExtraLinksProps {
  left?: extraLinkItem[];
  right?: extraLinkItem[];
}

export default function ExtraLinks({ extraLinks }: { extraLinks?: ExtraLinksProps }) {
  return (
    <section class="hidden md:block lg:container py-2 md:px-4 px-2">
      <div class="flex justify-between">
        <div class="flex justify-between">{ extraLinks?.left && extraLinks.left.map(({ text, href }: extraLinkItem) => (
          <a href={href}>
            {text}
          </a>
        )) }</div>
        <div class="flex justify-between">{ extraLinks?.right && extraLinks.right.map(({ text, href }: extraLinkItem) => (
          <a href={href} class="px-2 first:px-0 last:px-0 first:pl-2 last:pr-2">
            {text}
          </a>
        )) }</div>
      </div>
    </section>
  )
}
