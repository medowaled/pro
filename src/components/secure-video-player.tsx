"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Declare YouTube Player API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface SecureVideoPlayerProps {
  videoSrc: string;
}

// Function to get YouTube video ID from URL
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to get Google Drive file ID from URL
const getGoogleDriveId = (url: string): string | null => {
  const regExp = /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// Function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Function to trigger fullscreen on any element
const requestFullscreen = (element: HTMLElement): boolean => {
  // Check if element is connected to DOM
  if (!element || !element.isConnected) {
    console.log('Element is not connected to DOM');
    return false;
  }
  
  try {
    if (element.requestFullscreen) {
      element.requestFullscreen();
      return true;
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
      return true;
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
      return true;
    }
  } catch (error) {
    console.log('Fullscreen request failed:', error);
    return false;
  }
  return false;
};

// Function to exit fullscreen
const exitFullscreen = (): boolean => {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      return true;
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
      return true;
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
      return true;
    }
  } catch (error) {
    console.log('Exit fullscreen failed:', error);
    return false;
  }
  return false;
};

export default function SecureVideoPlayer({
  videoSrc,
}: SecureVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  useEffect(() => {
    const playerElement = playerRef.current;
    if (!playerElement) return;

    // Disable context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+A, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J
      // But allow video control keys (space, arrow keys, etc.)
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))
      ) {
        e.preventDefault();
      }
      
      // Allow fullscreen shortcuts
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      
      // Allow video control keys to pass through
      // Space (play/pause), Arrow keys (seek), etc. are allowed
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    
    // Disable selection
    const handleSelectStart = (e: Event) => e.preventDefault();

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();

    // Disable cut
    const handleCut = (e: ClipboardEvent) => e.preventDefault();

    playerElement.addEventListener("contextmenu", handleContextMenu);
    playerElement.addEventListener("keydown", handleKeyDown);
    playerElement.addEventListener("dragstart", handleDragStart);
    playerElement.addEventListener("selectstart", handleSelectStart);
    playerElement.addEventListener("copy", handleCopy);
    playerElement.addEventListener("cut", handleCut);

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("contextmenu", handleContextMenu);
        playerElement.removeEventListener("keydown", handleKeyDown);
        playerElement.removeEventListener("dragstart", handleDragStart);
        playerElement.removeEventListener("selectstart", handleSelectStart);
        playerElement.removeEventListener("copy", handleCopy);
        playerElement.removeEventListener("cut", handleCut);
      }
    };
  }, []);

  // Global protection against developer tools and other security measures
  useEffect(() => {
    const handleDevTools = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return false;
      }
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent developer tools
    document.addEventListener('keydown', handleDevTools);
    document.addEventListener('contextmenu', handleRightClick);

    // Disable text selection globally when video is playing
    document.body.style.userSelect = 'none';
    (document.body.style as any).webkitUserSelect = 'none';
    (document.body.style as any).mozUserSelect = 'none';
    (document.body.style as any).msUserSelect = 'none';

    // Add global CSS to prevent right-click on video elements
    const style = document.createElement('style');
    style.textContent = `
      video, iframe, .ytp-player-content, .html5-video-player {
        pointer-events: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      video::-webkit-media-controls, video::-webkit-media-controls-panel {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('keydown', handleDevTools);
      document.removeEventListener('contextmenu', handleRightClick);
      
      // Re-enable text selection when component unmounts
      document.body.style.userSelect = '';
      (document.body.style as any).webkitUserSelect = '';
      (document.body.style as any).mozUserSelect = '';
      (document.body.style as any).msUserSelect = '';
      
      // Remove the added style
      document.head.removeChild(style);
    };
  }, []);

  // Specific right-click prevention for video elements
  useEffect(() => {
    const handleVideoContextMenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Function to add right-click prevention to all video elements
    const addRightClickPrevention = () => {
      const videoElements = document.querySelectorAll('video, iframe, .ytp-player-content, .html5-video-player');
      videoElements.forEach(element => {
        element.addEventListener('contextmenu', handleVideoContextMenu, true);
        element.addEventListener('mousedown', (e) => {
          const mouseEvent = e as MouseEvent;
          if (mouseEvent.button === 2) { // Right mouse button
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }, true);
      });
    };

    // Add prevention immediately
    addRightClickPrevention();

    // Add prevention after a short delay to catch dynamically created elements
    const timeoutId = setTimeout(addRightClickPrevention, 1000);

    // Set up a mutation observer to catch new video elements
    const observer = new MutationObserver(() => {
      addRightClickPrevention();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      
      const videoElements = document.querySelectorAll('video, iframe, .ytp-player-content, .html5-video-player');
      videoElements.forEach(element => {
        element.removeEventListener('contextmenu', handleVideoContextMenu, true);
      });
    };
  }, []);

  const youTubeId = getYouTubeId(videoSrc);
  const googleDriveId = getGoogleDriveId(videoSrc);

  // Initialize YouTube Player API
  useEffect(() => {
    if (!youTubeId) return;

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current && youTubeId) {
        youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: youTubeId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            autoplay: 1,
            mute: 1,
            disablekb: 1,
            fs: 1,
            controls: 0,
            showinfo: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              setIsLoaded(true);
              setDuration(event.target.getDuration());
              setIsMuted(event.target.isMuted());
              setVolume(event.target.getVolume() / 100);
            },
            onStateChange: (event: any) => {
              // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
              setIsPlaying(event.data === 1);
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data);
            }
          }
        });
      }
    };

    // If API is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
      }
    };
  }, [youTubeId]);

  // Update current time and volume for YouTube
  useEffect(() => {
    if (!youTubeId || !youtubePlayerRef.current) return;

    const interval = setInterval(() => {
      if (youtubePlayerRef.current && !isSeeking) {
        try {
          if (youtubePlayerRef.current.getCurrentTime) {
            const time = youtubePlayerRef.current.getCurrentTime();
            setCurrentTime(time);
          }
          if (youtubePlayerRef.current.getVolume) {
            const vol = youtubePlayerRef.current.getVolume();
            setVolume(vol / 100);
          }
          if (youtubePlayerRef.current.isMuted) {
            const muted = youtubePlayerRef.current.isMuted();
            setIsMuted(muted);
          }
        } catch (error) {
          console.log('YouTube player not ready yet');
        }
      }
    }, 500); // Update more frequently for smoother slider

    return () => clearInterval(interval);
  }, [youTubeId, isSeeking]);

  // Control functions
  const togglePlay = () => {
    if (youTubeId && youtubePlayerRef.current) {
      try {
        if (isPlaying) {
          youtubePlayerRef.current.pauseVideo();
        } else {
          youtubePlayerRef.current.playVideo();
        }
      } catch (error) {
        console.log('YouTube player not ready for play/pause');
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (youTubeId && youtubePlayerRef.current) {
      try {
        if (isMuted) {
          youtubePlayerRef.current.unMute();
        } else {
          youtubePlayerRef.current.mute();
        }
      } catch (error) {
        console.log('YouTube player not ready for mute control');
      }
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const setVideoVolume = (newVolume: number) => {
    if (youTubeId && youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current.setVolume(newVolume * 100);
        setVolume(newVolume);
      } catch (error) {
        console.log('YouTube player not ready for volume control');
      }
    } else if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const seekTo = (time: number) => {
    if (youTubeId && youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current.seekTo(time, true);
        setCurrentTime(time); // Update immediately for better UX
      } catch (error) {
        console.log('YouTube player not ready for seeking');
      }
    } else if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time); // Update immediately for better UX
    }
  };

  const restart = () => {
    seekTo(0);
  };

  const skipBackward10 = () => {
    const newTime = Math.max(0, currentTime - 10);
    seekTo(newTime);
  };

  const skipForward10 = () => {
    const newTime = Math.min(duration, currentTime + 10);
    seekTo(newTime);
  };

  const skipBackward30 = () => {
    const newTime = Math.max(0, currentTime - 30);
    seekTo(newTime);
  };

  const skipForward30 = () => {
    const newTime = Math.min(duration, currentTime + 30);
    seekTo(newTime);
  };

  const skipBackward60 = () => {
    const newTime = Math.max(0, currentTime - 60);
    seekTo(newTime);
  };

  const skipForward60 = () => {
    const newTime = Math.min(duration, currentTime + 60);
    seekTo(newTime);
  };

  const toggleFullscreen = () => {
    console.log('toggleFullscreen called');
    
    if (!playerRef.current || !playerRef.current.isConnected) {
      console.log('Player element is not connected to DOM');
      return;
    }
    
    if (!isFullscreen) {
      console.log('Attempting to enter fullscreen');
      
      // For YouTube videos, use YouTube's fullscreen API
      if (youTubeId && youtubePlayerRef.current) {
        console.log('YouTube video detected, trying YouTube fullscreen methods');
        try {
          // Try YouTube's fullscreen method first
          if (youtubePlayerRef.current.requestFullscreen) {
            console.log('Trying YouTube requestFullscreen');
            youtubePlayerRef.current.requestFullscreen();
            setIsFullscreen(true);
            return;
          }
          // Try using YouTube's built-in fullscreen API
          if (youtubePlayerRef.current.getPlayerState && youtubePlayerRef.current.getPlayerState() !== -1) {
            console.log('Trying iframe fullscreen');
            // Use YouTube's built-in fullscreen
            const iframe = playerRef.current.querySelector('iframe');
            if (iframe && iframe.isConnected) {
              if (requestFullscreen(iframe)) {
                setIsFullscreen(true);
                return;
              }
            }
            // Try to trigger fullscreen on the YouTube player container
            const youtubeContainer = playerRef.current.querySelector('#youtube-player');
            if (youtubeContainer && youtubeContainer.isConnected && requestFullscreen(youtubeContainer as HTMLElement)) {
              setIsFullscreen(true);
              return;
            }
          }
        } catch (error) {
          console.log('YouTube fullscreen failed, trying browser fullscreen');
        }
      }
      
      // For other videos, use browser fullscreen API - ONLY the video container
      console.log('Trying browser fullscreen on player container');
      if (requestFullscreen(playerRef.current)) {
        setIsFullscreen(true);
      } else {
        console.log('Fullscreen failed');
      }
    } else {
      console.log('Attempting to exit fullscreen');
      // Exit fullscreen
      exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  let player;

  if (youTubeId) {
    player = (
      <div 
        id="youtube-player"
        className="w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
    );
  } else if (googleDriveId) {
    player = (
      <iframe
        className="w-full h-full"
        src={`https://drive.google.com/file/d/${googleDriveId}/preview`}
        title="Google Drive video player"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    );
  } else {
    player = (
      <video
        ref={videoRef}
        className="w-full h-full"
        src={videoSrc}
        preload="metadata"
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            setIsLoaded(true);
          }
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => {
          if (videoRef.current) {
            setVolume(videoRef.current.volume);
            setIsMuted(videoRef.current.muted);
          }
        }}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          pointerEvents: 'auto'
        }}
      />
    );
  }

  return (
    <div className="w-full">
      <div
        ref={playerRef}
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden select-none"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        {player}
        {/* Invisible overlay to prevent interaction - but allow fullscreen */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ pointerEvents: 'none' }}
        />
        {/* Fullscreen trigger overlay - only visible when hovering */}
        <div 
          className="absolute inset-0 z-20 opacity-0 hover:opacity-100 transition-opacity duration-200"
          style={{ pointerEvents: 'auto' }}
          onClick={toggleFullscreen}
        />
      </div>
      
      {/* External Video Controls */}
      <div 
        className="mt-4 p-4 bg-secondary/30 rounded-lg"
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        <div 
          className="flex flex-col gap-4"
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          {/* Progress Bar */}
          <div 
            className="w-full"
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
          >
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={(value) => {
                setIsSeeking(true);
                seekTo(value[0]);
              }}
              onValueCommit={() => {
                setIsSeeking(false);
              }}
              className="w-full"
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={restart}
              disabled={!isLoaded}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={togglePlay}
              disabled={!isLoaded}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>

          {/* Skip Controls */}
          <div className="flex items-center justify-center gap-1">
            {/* Backward Skip Buttons */}
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={skipBackward60}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                -1m
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={skipBackward30}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                -30s
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={skipBackward10}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                -10s
              </Button>
            </div>

            {/* Forward Skip Buttons */}
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={skipForward10}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                +10s
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={skipForward30}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                +30s
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={skipForward60}
                disabled={!isLoaded}
                className="text-xs px-2"
              >
                +1m
              </Button>
            </div>
          </div>
          
          {/* Volume Control */}
          <div 
            className="flex items-center gap-2"
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              disabled={!isLoaded}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVideoVolume(value[0] / 100)}
              className="flex-1"
              disabled={!isLoaded}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            />
            <span className="text-sm text-muted-foreground min-w-[3rem]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
