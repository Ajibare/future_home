import * as React from "react";

const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++} style={{ color: "var(--text)" }}>{match[1]}</strong>);
    } else {
      const isExternal = /^https?:\/\//.test(match[3]);
      nodes.push(
        <a
          key={key++}
          href={match[3]}
          style={{ color: "var(--primary)" }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = INLINE_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderRichText(body: string): React.ReactNode {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));

    if (isList) {
      return (
        <ul key={i} className="list-disc pl-5 space-y-1.5">
          {lines.map((line, j) => (
            <li key={j}>{parseInline(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i}>
        {lines.map((line, j) => (
          <React.Fragment key={j}>
            {j > 0 && <br />}
            {parseInline(line)}
          </React.Fragment>
        ))}
      </p>
    );
  });
}
