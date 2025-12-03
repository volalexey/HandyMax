import { useRef, useState } from "react";

type Item = {
  id: string;
  url: string;
  status: "ready" | "uploading";
  selected: boolean;
  progress?: number;
  file?: File;
};

interface Props {
  initial?: string[];
  onChange?: (files: File[]) => void;
}

export const AddPhotos = ({ initial = [], onChange }: Props) => {
  const [items, setItems] = useState<Item[]>(
    initial.map((url, i) => ({
      id: `init-${i}`,
      url,
      status: "ready",
      selected: false,
    }))
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const handleFiles = (list: FileList | null) => {
    if (!list?.length) return;
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));

    const pending: Item[] = files.map((file, i) => ({
      id: `u-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      file,
      status: "uploading",
      progress: 0,
      selected: false,
    }));

    setItems((prev) => [...prev, ...pending]);
    onChange?.(files);

    pending.forEach((item) => {
      const tick = setInterval(() => {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, progress: Math.min(100, (it.progress ?? 0) + 10) }
              : it
          )
        );
      }, 150);

      setTimeout(() => {
        clearInterval(tick);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: "ready", progress: 100 }
              : it
          )
        );
      }, 1600);
    });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const toggleSelect = (id: string) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, selected: !it.selected } : it
      )
    );

  const openImage = (url: string) => window.open(url, "_blank");

  return (
    <div 
      onDrop={onDrop} 
      onDragOver={(e) => e.preventDefault()}
      className="w-full"
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4 items-start">
        
        {items.map((it) =>
          it.status === "uploading" ? (
            <div key={it.id} className="relative w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm overflow-hidden flex items-center justify-center p-3">
              <div className="flex flex-col gap-2.5 w-full text-center">
                <span className="text-sm text-gray-500">Uploading</span>
                <div className="w-[90px] h-[6px] bg-[#e9ecef] rounded-full overflow-hidden mx-auto">
                  <div 
                    className="h-full bg-[#4c6ef5] transition-all duration-150" 
                    style={{ width: `${it.progress ?? 0}%` }} 
                  />
                </div>
              </div>
            </div>
          ) : (
            <button
              key={it.id}
              type="button"
              onClick={() => toggleSelect(it.id)}
              className={`relative w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm overflow-hidden p-0 group
                ${it.selected ? "ring-2 ring-[#a855f7]" : ""}`}
            >
              <img className="w-full h-full object-cover block p-2.5 rounded-sm" src={it.url} alt="" />
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  type="button"
                  className="w-[30px] h-[30px] border border-[#d7dde3] rounded-lg bg-white/95 flex items-center justify-center hover:bg-gray-100 transition"
                  onClick={(e) => { e.stopPropagation(); openImage(it.url); }}
                >
                  🔍
                </button>
                <button
                  type="button"
                  className="w-[30px] h-[30px] border border-[#d7dde3] rounded-lg bg-white/95 flex items-center justify-center hover:bg-gray-100 transition"
                  onClick={(e) => { e.stopPropagation(); remove(it.id); }}
                >
                  🗑
                </button>
              </div>
            </button>
          )
        )}

        <button
          type="button"
          onClick={openPicker}
          className="w-[120px] h-[120px] bg-white border border-[#d7dde3] rounded-sm border-dashed text-[#636b74] flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition"
        >
          <div className="text-[22px] leading-none mt-2">+</div>
          <span className="text-sm">Upload</span>
        </button>
      </div>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};