"use client";

import { useEffect, useRef, useCallback } from "react";
import {
    X,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Loader2,
} from "lucide-react";
import { useState } from "react";

/**
 * VideoModal Component
 *
 * A production-ready video player modal that loads video directly from Nginx static endpoint.
 *
 * VALIDATION CHECKLIST:
 * - [ ] Open DevTools Network tab and confirm 200/206 responses for video
 * - [ ] Confirm Range requests work (seek to different positions)
 * - [ ] Confirm caching headers are present (Cache-Control, ETag)
 * - [ ] Test on mobile devices for playsInline behavior
 */

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc?: string;
    title?: string;
}

const MEDIA_BASE_URL =
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://tikoncha.uz";
const DEFAULT_VIDEO_PATH = "/media/tutorial.mp4";

export function VideoModal({
    isOpen,
    onClose,
    videoSrc = `${MEDIA_BASE_URL}${DEFAULT_VIDEO_PATH}`,
    title = "Tikoncha Tutorial",
}: VideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [showControls, setShowControls] = useState(true);

    // Format time helper
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Reset video when modal opens
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
            setIsLoading(true);
        }
    }, [isOpen]);

    // Auto-hide controls
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPlaying && showControls) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }, [isMuted]);

    const toggleFullscreen = useCallback(() => {
        if (!videoRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        if (!videoRef.current) return;
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setProgress((current / total) * 100);
        setCurrentTime(formatTime(current));
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        if (!videoRef.current) return;
        setDuration(formatTime(videoRef.current.duration));
        setIsLoading(false);
    }, []);

    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = percent * videoRef.current.duration;
    }, []);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === modalRef.current) {
                onClose();
            }
        },
        [onClose]
    );

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close video"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Video Container - 9:16 aspect ratio for vertical video */}
            <div
                className="relative w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] max-h-[85vh] mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl"
                onMouseMove={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
            >
                {/* Title Bar */}
                <div
                    className={`absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h3 className="text-white font-semibold text-lg">
                        {title}
                    </h3>
                </div>

                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full aspect-[9/16] object-contain bg-black"
                    controls={false}
                    playsInline
                    preload="metadata"
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                />

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    </div>
                )}

                {/* Play Button Overlay (when paused) */}
                {!isPlaying && !isLoading && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <Play
                                className="w-10 h-10 text-white ml-1"
                                fill="white"
                            />
                        </div>
                    </button>
                )}

                {/* Custom Controls */}
                <div
                    className={`absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {/* Progress Bar */}
                    <div
                        className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer mb-4 group"
                        onClick={handleSeek}
                    >
                        <div
                            className="h-full bg-primary rounded-full relative transition-all"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6" fill="white" />
                                ) : (
                                    <Play
                                        className="w-6 h-6 ml-0.5"
                                        fill="white"
                                    />
                                )}
                            </button>

                            {/* Volume */}
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>

                            {/* Time */}
                            <span className="text-white text-sm font-medium">
                                {currentTime} / {duration}
                            </span>
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
