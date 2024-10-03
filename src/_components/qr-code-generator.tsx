"use client";
import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { ChevronDownIcon, Download } from "lucide-react";
import locale from "~/utils/locale.json";
import type LocaleStrings from "~/utils/types";

export default function CodeGenerator({ lang = "en" }: { lang?: "en" | "es" }) {
  const [qrCodeData, setQrCodeData] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");
  const [borderSize, setBorderSize] = useState(6);
  const [error, setError] = useState("");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const qrRef = useRef(null);
  const localeStrings: LocaleStrings = locale[lang];

  const handleGenerate = () => {
    if (!qrCodeData.trim()) {
      setError(localeStrings.error);
      return;
    }
    setError("");
  };

  const handleDownload = useCallback(() => {
    if (!qrRef.current) return;

    const downloadQrCode = (dataUrl: string, extension: string) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qrcode.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (downloadFormat === "svg") {
      const svg = (qrRef.current as HTMLDivElement).querySelector(
        "svg",
      ) as Node;
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);
      downloadQrCode(svgUrl, "svg");
    } else {
      void html2canvas(qrRef.current).then((canvas) => {
        const dataUrl = canvas.toDataURL(`image/${downloadFormat}`);
        downloadQrCode(dataUrl, downloadFormat);
      });
    }
  }, [downloadFormat]);

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 text-sm text-black shadow-md">
      <h1 className="mb-4 text-2xl font-bold">{localeStrings.title}</h1>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="qr-input">
            {localeStrings.labels.data}
          </label>
          <input
            className="rounded-md border border-gray-200 p-2 outline-none transition focus:border-blue-400"
            id="qr-input"
            placeholder="Enter text or URL"
            value={qrCodeData}
            onChange={(e) => setQrCodeData(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-1 space-x-4">
          <div className="flex w-6/12 flex-col items-center gap-1">
            <label className="text-nowrap font-semibold" htmlFor="bg-color">
              {localeStrings.labels.background}
            </label>
            <input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-2 py-1"
            />
          </div>

          <div className="flex w-6/12 flex-col items-center gap-1">
            <label className="text-nowrap font-semibold" htmlFor="fg-color">
              {localeStrings.labels.foreground}
            </label>
            <input
              id="fg-color"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-2 py-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="border-size">Border Size</label>
          <input
            type="range"
            id="border-size"
            min={0}
            max={50}
            step={1}
            value={borderSize}
            onChange={(e) => setBorderSize(e.target.value as unknown as number)}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{borderSize}px</span>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full rounded-md bg-black py-2 font-semibold text-white"
        >
          {localeStrings.buttons.generate}
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {qrCodeData && !error && (
          <div className="mt-4 flex flex-col items-center">
            <div
              ref={qrRef}
              style={{
                padding: `${borderSize}px`,
                backgroundColor: bgColor,
              }}
            >
              <QRCodeSVG
                value={qrCodeData}
                size={200}
                bgColor={bgColor}
                fgColor={fgColor}
                level="L"
                includeMargin={false}
              />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="relative">
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="appearance-none rounded-md border border-gray-200 py-2 pl-3 pr-10"
                >
                  <option value="svg">SVG</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-[27%] size-5" />
              </div>

              <button
                onClick={handleDownload}
                className="flex gap-1 rounded-md bg-black px-4 py-2 font-bold text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                <span>{localeStrings.buttons.download}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
