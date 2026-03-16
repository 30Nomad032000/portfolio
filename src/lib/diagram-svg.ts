const CW = 8.4; // character cell width
const CH = 17; // character cell height
const PAD = 16;
const STROKE = "#8b9eb0";
const TEXT_COLOR = "#8b9eb0";
const SW = 1.5; // stroke width

const BOX_CHARS = new Set("─│┌┐└┘├┤┬┴┼╭╮╰╯→←↑↓+");

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function diagramToSvg(text: string): string {
  const lines = text.split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

  const numRows = lines.length;
  const maxCols = Math.max(...lines.map((l) => [...l].length));
  const svgW = maxCols * CW + PAD * 2;
  const svgH = numRows * CH + PAD * 2;

  const paths: string[] = [];
  const texts: string[] = [];

  for (let r = 0; r < numRows; r++) {
    const chars = [...lines[r]];

    for (let c = 0; c < chars.length; c++) {
      const ch = chars[c];
      if (ch === " ") continue;

      const x = PAD + c * CW;
      const y = PAD + r * CH;
      const cx = x + CW / 2;
      const cy = y + CH / 2;
      const ri = x + CW;
      const b = y + CH;

      if (BOX_CHARS.has(ch)) {
        let d = "";

        switch (ch) {
          case "─":
            d = `M${x},${cy}L${ri},${cy}`;
            break;
          case "│":
            d = `M${cx},${y}L${cx},${b}`;
            break;
          case "┌":
            d = `M${ri},${cy}L${cx},${cy}L${cx},${b}`;
            break;
          case "┐":
            d = `M${x},${cy}L${cx},${cy}L${cx},${b}`;
            break;
          case "└":
            d = `M${cx},${y}L${cx},${cy}L${ri},${cy}`;
            break;
          case "┘":
            d = `M${cx},${y}L${cx},${cy}L${x},${cy}`;
            break;
          case "├":
            d = `M${cx},${y}L${cx},${b}M${cx},${cy}L${ri},${cy}`;
            break;
          case "┤":
            d = `M${cx},${y}L${cx},${b}M${cx},${cy}L${x},${cy}`;
            break;
          case "┬":
            d = `M${x},${cy}L${ri},${cy}M${cx},${cy}L${cx},${b}`;
            break;
          case "┴":
            d = `M${x},${cy}L${ri},${cy}M${cx},${cy}L${cx},${y}`;
            break;
          case "┼":
          case "+":
            d = `M${x},${cy}L${ri},${cy}M${cx},${y}L${cx},${b}`;
            break;

          // Rounded corners — quadratic bezier
          case "╭":
            d = `M${ri},${cy}Q${cx},${cy} ${cx},${b}`;
            break;
          case "╮":
            d = `M${x},${cy}Q${cx},${cy} ${cx},${b}`;
            break;
          case "╰":
            d = `M${cx},${y}Q${cx},${cy} ${ri},${cy}`;
            break;
          case "╯":
            d = `M${cx},${y}Q${cx},${cy} ${x},${cy}`;
            break;

          // Arrows
          case "→": {
            const aw = 4,
              ah = 3;
            d = `M${x},${cy}L${ri},${cy}M${ri},${cy}L${ri - aw},${cy - ah}M${ri},${cy}L${ri - aw},${cy + ah}`;
            break;
          }
          case "←": {
            const aw = 4,
              ah = 3;
            d = `M${x},${cy}L${ri},${cy}M${x},${cy}L${x + aw},${cy - ah}M${x},${cy}L${x + aw},${cy + ah}`;
            break;
          }
          case "↑": {
            const aw = 3,
              ah = 4;
            d = `M${cx},${y}L${cx},${b}M${cx},${y}L${cx - aw},${y + ah}M${cx},${y}L${cx + aw},${y + ah}`;
            break;
          }
          case "↓": {
            const aw = 3,
              ah = 4;
            d = `M${cx},${y}L${cx},${b}M${cx},${b}L${cx - aw},${b - ah}M${cx},${b}L${cx + aw},${b - ah}`;
            break;
          }
        }

        if (d) paths.push(`<path d="${d}"/>`);
      } else {
        // Regular text character — position at center of cell
        const tx = cx;
        const ty = y + CH * 0.65;
        texts.push(
          `<text x="${tx}" y="${ty}" text-anchor="middle">${esc(ch)}</text>`
        );
      }
    }
  }

  return `<div class="blog-diagram"><svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:${svgW}px;height:auto;display:block;margin:0 auto">
<style>path{stroke:${STROKE};stroke-width:${SW};fill:none;stroke-linecap:square;stroke-linejoin:round}text{fill:${TEXT_COLOR};font-family:var(--font-diagram),'JetBrains Mono','Consolas',monospace;font-size:14px}</style>
${paths.join("\n")}
${texts.join("\n")}
</svg></div>`;
}
