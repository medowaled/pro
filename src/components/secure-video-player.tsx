'use client';

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Minimize2, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface SecureVideoPlayerProps {
  videoSrc: string;
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getGoogleDriveId = (url: string): string | null => {
  const regExp = /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function SecureVideoPlayer({ videoSrc }: SecureVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const youTubeId = getYouTubeId(videoSrc);
  const googleDriveId = getGoogleDriveId(videoSrc);

  // --- نظام الحماية (منع كليك يمين واختصارات الكيبورد) ---
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --- التحكم في الصوت ---
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (youTubeId && youtubePlayerRef.current) {
      newMuted ? youtubePlayerRef.current.mute() : youtubePlayerRef.current.unMute();
    } else if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVol = value[0] / 100;
    setVolume(newVol);
    if (youTubeId && youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(value[0]);
    } else if (videoRef.current) {
      videoRef.current.volume = newVol;
    }
  };

  // --- سرعة التشغيل ---
  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (youTubeId && youtubePlayerRef.current?.setPlaybackRate) {
      youtubePlayerRef.current.setPlaybackRate(speed);
    } else if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    if (!youTubeId) return;
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current && youTubeId) {
        youtubePlayerRef.current = new window.YT.Player('youtube-player', {
          height: '100%', width: '100%', videoId: youTubeId,
          playerVars: { rel: 0, modestbranding: 1, autoplay: 1, mute: 0, controls: 0, enablejsapi: 1 },
          events: {
            onReady: (event: any) => { setIsLoaded(true); setDuration(event.target.getDuration()); },
            onStateChange: (event: any) => setIsPlaying(event.data === 1),
          }
        });
      }
    };
    if (window.YT && window.YT.Player) window.onYouTubeIframeAPIReady();
    return () => youtubePlayerRef.current?.destroy();
  }, [youTubeId]);

  const toggleFullscreen = () => {
    const element = playerRef.current;
    if (!element) return;
    if (!document.fullscreenElement) {
      element.requestFullscreen?.() || (element as any).webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const fsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsChange);
    return () => document.removeEventListener('fullscreenchange', fsChange);
  }, []);

  return (
    <div className="w-full select-none">
      <div ref={playerRef} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
        {youTubeId ? <div id="youtube-player" className="w-full h-full pointer-events-none" /> : 
         googleDriveId ? <iframe className="w-full h-full pointer-events-none" src={`https://drive.google.com/file/d/${googleDriveId}/preview`} allow="autoplay; fullscreen" allowFullScreen /> :
         <video ref={videoRef} className="w-full h-full" src={videoSrc} onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)} onTimeUpdate={() => !isSeeking && setCurrentTime(videoRef.current?.currentTime || 0)} />}
        
        {/* حماية إضافية فوق الفيديو */}
        <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />
      </div>
      
      <div className="mt-4 p-4 bg-secondary/30 rounded-lg space-y-4">
        {/* شريط التقدم */}
        <Slider value={[currentTime]} max={duration} step={0.1} onValueChange={(v) => { setCurrentTime(v[0]); if(!youTubeId) videoRef.current!.currentTime = v[0]; else youtubePlayerRef.current.seekTo(v[0]); }} />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* التحكم الأساسي */}
          <div className="flex items-center gap-2">
             <Button variant="outline" size="icon" onClick={() => (youTubeId ? youtubePlayerRef.current.seekTo(0) : videoRef.current!.currentTime = 0)}><RotateCcw className="h-4 w-4" /></Button>
             <Button variant="default" size="lg" onClick={() => {
                if (youTubeId && youtubePlayerRef.current) isPlaying ? youtubePlayerRef.current.pauseVideo() : youtubePlayerRef.current.playVideo();
                else if (videoRef.current) isPlaying ? videoRef.current.pause() : videoRef.current.play();
                setIsPlaying(!isPlaying);
             }} className="w-20">{isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}</Button>
             <Button variant="outline" size="icon" onClick={toggleFullscreen}>{isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</Button>
          </div>

          {/* التحكم في الصوت */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider value={[isMuted ? 0 : volume * 100]} max={100} step={1} onValueChange={handleVolumeChange} className="w-24" />
          </div>

          {/* سرعة التشغيل */}
          <div className="flex items-center gap-1 bg-background/50 p-1 rounded-md border">
            <Gauge className="w-4 h-4 mx-1 text-muted-foreground" />
            {[1, 1.25, 1.5, 2].map((speed) => (
              <Button key={speed} variant={playbackRate === speed ? "default" : "ghost"} size="sm" className="h-7 px-2 text-xs" onClick={() => changeSpeed(speed)}>{speed}x</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}