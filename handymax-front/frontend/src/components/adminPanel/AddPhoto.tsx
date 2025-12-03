import { useRef, useState } from "react";

type Item = {
  id: string;
  url: string;
  status: "ready" | "uploading";
  progress?: number;
  file?: File;
};

interface Props {
  initial?: string;
  onChange?: (file?: File) => void;
}

export const AddPhoto = ({ initial, onChange }: Props) => {
  const [item, setItem] = useState<Item | null>(
    initial
      ? { id: "init-0", url: initial, status: "ready" }
      : null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const pending: Item = {
      id: `u-${Date.now()}`,
      url: URL.createObjectURL(file),
      file,
      status: "uploading",
      progress: 0,
    };

    setItem(pending);
    onChange?.(file);

    const tick = setInterval(() => {
      setItem((prev) =>
        prev
          ? { ...prev, progress: Math.min(100, (prev.progress ?? 0) + 10) }
          : prev
      );
    }, 150);

    setTimeout(() => {
      clearInterval(tick);
      setItem((prev) =>
        prev ? { ...prev, status: "ready", progress: 100 } : prev
      );
    }, 1600);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const remove = () => {
    setItem(null);
    onChange?.(undefined);
  };

  const openImage = (url: string) => window.open(url, "_blank");

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-fit"
    >
      <div className="flex items-start gap-4">
        {item ? (
          item.status === "uploading" ? (
            <div className="relative w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm overflow-hidden flex items-center justify-center p-3">
              <div className="flex flex-col gap-2.5 w-full text-center">
                <span className="text-sm text-gray-500">Uploading</span>
                <div className="w-[90px] h-[6px] bg-[#e9ecef] rounded-full overflow-hidden mx-auto">
                  <div
                    className="h-full bg-[#4c6ef5] transition-all duration-150"
                    style={{ width: `${item.progress ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm overflow-hidden p-0 group">
              <img className="w-full h-full object-cover block p-2.5 rounded-sm" src={item.url} alt="" />
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  type="button"
                  className="w-[30px] h-[30px] border border-[#d7dde3] rounded-lg bg-white/95 flex items-center justify-center hover:bg-gray-100 transition"
                  onClick={() => openImage(item.url)}
                >
                  🔍
                </button>
                <button
                  type="button"
                  className="w-[30px] h-[30px] border border-[#d7dde3] rounded-lg bg-white/95 flex items-center justify-center hover:bg-gray-100 transition"
                  onClick={remove}
                >
                  🗑
                </button>
              </div>
            </div>
          )
        ) : (
          <button
            type="button"
            onClick={openPicker}
            className="w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm border-dashed text-[#636b74] flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition"
          >
            <div className="text-[22px] leading-none mt-2">+</div>
            <span className="text-sm">Upload</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onInput}
      />
    </div>
  );
};