import Image from "next/image";

interface GalleryProps {
  images: string[];
  altPrefix: string;
}

export function Gallery({ images, altPrefix }: GalleryProps) {
  if (!images.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, index) => (
        <div
          key={src}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
        >
          <Image
            src={src}
            alt={`${altPrefix} — photo ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
