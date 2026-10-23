"use client";

import { useCallback, useState } from "react";

const QUALITIES = ["maxresdefault", "hqdefault", "mqdefault", "default"] as const;
type Quality = (typeof QUALITIES)[number];

export function youtubeThumbnailUrl(id: string, quality: Quality = "hqdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

export function youtubeThumbnailWithFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  id: string
) {
  const img = e.currentTarget;
  if (img.src.includes("maxresdefault")) {
    img.src = youtubeThumbnailUrl(id, "hqdefault");
  } else if (img.src.includes("hqdefault")) {
    img.src = youtubeThumbnailUrl(id, "mqdefault");
  } else if (img.src.includes("mqdefault")) {
    img.src = youtubeThumbnailUrl(id, "default");
  }
}

interface YouTubeThumbnailProps {
  id: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  preferMaxRes?: boolean;
}

export default function YouTubeThumbnail({
  id,
  alt,
  className,
  style,
  loading = "lazy",
  preferMaxRes = true,
}: YouTubeThumbnailProps) {
  const [qualityIndex, setQualityIndex] = useState(preferMaxRes ? 0 : 1);

  const bumpQuality = useCallback(() => {
    setQualityIndex((index) => Math.min(index + 1, QUALITIES.length - 1));
  }, []);

  const handleError = useCallback(() => {
    bumpQuality();
  }, [bumpQuality]);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      // YouTube sometimes serves a tiny placeholder for missing max-res assets.
      if (qualityIndex === 0 && img.naturalWidth > 0 && img.naturalWidth < 480) {
        bumpQuality();
      }
    },
    [qualityIndex, bumpQuality]
  );

  return (
    <img
      src={youtubeThumbnailUrl(id, QUALITIES[qualityIndex])}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }}
    />
  );
}
