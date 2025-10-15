"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

type Props = {
  src: string; // รองรับทั้ง .mp4 หรือ .m3u8 (HLS)
  poster?: string;
  aspectRatio?: string; // เช่น "4 / 3" หรือ "16 / 9"
  className?: string;
  controls?: boolean; // default false (เหมือนปิด controls ใน Mux)
  preload?: "auto" | "metadata" | "none";
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
};

export default function VideoPlayer({
  src,
  poster,
  aspectRatio = "4 / 3",
  className = "",
  controls = false,
  preload = "none",
  muted = true,
  loop = true,
  autoPlay = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const isHls = src.endsWith(".m3u8");
    const sources = [
      { src, type: isHls ? "application/x-mpegURL" : "video/mp4" },
    ];

    const playerOptions = {
      autoplay: autoPlay,
      muted: muted,
      preload: preload,
      poster: poster,
      loop: loop,
      controls: controls,
      sources: sources,
    };

    playerRef.current = videojs(videoRef.current, playerOptions);

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [src, poster, controls, preload, muted, loop, autoPlay]);

  return (
    <div
      className={`w-auto h-[260px] md:!h-full md:!w-full overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        className="vjs-default-skin !h-full !w-full flex items-center justify-center "
        playsInline
      />
    </div>
  );
}
