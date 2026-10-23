import Image from "next/image";

interface FeaturedImageProps {
  src: string;
  alt: string;
}

export default function FeaturedImage({ src, alt }: FeaturedImageProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 bg-[#f0f0ed] group">
      {/* Aspect ratio container */}
      <div className="slot-media relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover object-left transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          loading="lazy"
          quality={85}
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Bottom caption bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white/80 text-xs font-medium truncate">{alt}</p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-[#00793A]/10 rounded-full" />
      </div>
    </div>
  );
}
