import type { ReactNode } from "react";

/**
 * Tiny, dependency-free renderer for the blog's post content.
 *
 * Supports a safe subset of Markdown (everything is HTML-escaped first,
 * so authors can never inject markup/scripts):
 *   - `#`, `##`, `###` headings
 *   - `- item` / `* item` (unordered) and `1. item` (ordered) lists
 *   - paragraphs (blank-line separated)
 *   - `> quote` blockquotes
 *   - `---` horizontal rules
 *   - inline **bold**, *italic*, `code`, and [text](url) links
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeLinkUrl(href: string): string {
  const url = href.trim();
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  if (url.startsWith("/") || url.startsWith("#")) return url;
  return "";
}

function inlineText(plain: string): ReactNode {
  // Split on the inline markers while keeping the delimiters.
  const parts = plain.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]*\))/g
  );

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]*)\)$/);
    if (linkMatch) {
      const href = safeLinkUrl(escapeHtml(linkMatch[2]));
      if (href) {
        return (
          <a
            key={i}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }
      return linkMatch[1];
    }
    return part;
  });
}

export function renderMarkdown(content: string): ReactNode {
  const blocks = content.split(/\n{2,}/);
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const key = out.length;
    out.push(
      list.ordered ? (
        <ol key={key}>
          {list.items.map((item, i) => (
            <li key={i}>{inlineText(item)}</li>
          ))}
        </ol>
      ) : (
        <ul key={key}>
          {list.items.map((item, i) => (
            <li key={i}>{inlineText(item)}</li>
          ))}
        </ul>
      )
    );
    list = null;
  };

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    if (/^-{3,}$/.test(block)) {
      flushList();
      out.push(<hr key={out.length} />);
      continue;
    }

    if (/^###\s+/.test(block)) {
      flushList();
      out.push(<h4 key={out.length}>{inlineText(block.replace(/^###\s+/, ""))}</h4>);
      continue;
    }
    if (/^##\s+/.test(block)) {
      flushList();
      out.push(<h3 key={out.length}>{inlineText(block.replace(/^##\s+/, ""))}</h3>);
      continue;
    }
    if (/^#\s+/.test(block)) {
      flushList();
      out.push(<h2 key={out.length}>{inlineText(block.replace(/^#\s+/, ""))}</h2>);
      continue;
    }

    if (/^>\s*/.test(block)) {
      flushList();
      const quote = block
        .split("\n")
        .map((line) => line.replace(/^>\s*/, ""))
        .join(" ");
      out.push(<blockquote key={out.length}>{inlineText(quote)}</blockquote>);
      continue;
    }

    const lines = block.split("\n").map((line) => line.trim());
    const allBullets = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l));
    const allNumbers = lines.length > 0 && lines.every((l) => /^\d+[.)]\s+/.test(l));

    if (allBullets || allNumbers) {
      list = list ?? { ordered: allNumbers, items: [] };
      for (const line of lines) {
        list.items.push(line.replace(/^(?:[-*]|\d+[.)])\s+/, ""));
      }
      continue;
    }

    flushList();
    out.push(<p key={out.length}>{inlineText(block.replace(/\n/g, " "))}</p>);
  }

  flushList();
  return <>{out}</>;
}