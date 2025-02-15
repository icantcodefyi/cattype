import html2canvas from "html2canvas";
import { Theme } from "../themes/types";

interface CaptureOptions {
  element: HTMLElement;
  theme: Theme;
  stats: {
    wpm: number;
    accuracy: number;
  };
}

export const captureResults = async ({
  element,
  theme,
  stats,
}: CaptureOptions) => {
  const container = document.createElement("div");
  const clone = element.cloneNode(true) as HTMLElement;

  // Simplified styling reset
  const cleanup = (element: HTMLElement) => {
    element.style.cssText = "transform: none; transition: none;";
    element.querySelectorAll(".font-mono, .text-primary").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.cssText = `
          font-family: 'Geist Mono', monospace;
          font-weight: 700;
        `;
      }
    });
  };

  cleanup(clone);

  // Container style
  container.style.cssText = `
    padding: 48px;
    background-color: ${theme.colors.background};
    border: 2px solid ${theme.colors.border};
    border-radius: 16px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  container.appendChild(clone);
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    backgroundColor: theme.colors.background,
    useCORS: true,
    scale: 2,
    logging: false,
    allowTaint: true,
    imageTimeout: 0,
    onclone: (doc) => {
      const style = document.createElement("style");
      style.textContent = `
        * { font-family: 'Geist', sans-serif !important; }
        .font-mono, .text-primary { 
          font-family: 'Geist Mono', monospace !important;
          font-weight: 700 !important;
        }
        .card {
          background-color: ${theme.colors.card} !important;
          border: 2px solid ${theme.colors.border} !important;
        }
      `;
      doc.head.appendChild(style);
    },
  });

  // Add watermark
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const padding = 40;
    const watermarkY = canvas.height - padding;

    // Stats
    ctx.font = "500 14px 'Geist'";
    ctx.fillStyle = theme.colors["muted-foreground"];
    ctx.textAlign = "left";
    ctx.fillText(
      `${Math.round(stats.wpm)} WPM · ${Math.round(stats.accuracy)}% ACC`,
      padding,
      watermarkY
    );

    // Brand
    ctx.textAlign = "right";
    ctx.font = "600 20px 'Monaco', 'Geist'";
    ctx.fillText("cattype_", canvas.width - padding, watermarkY);
  }

  document.body.removeChild(container);
  return canvas;
};
