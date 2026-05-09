import React, { useRef, useEffect, useCallback } from 'react';
import { Play, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { reelsPortfolio } from '../data/mock';

// ── Global caches (module-level, survive re-renders) ──────────────────────────
const videoSourceCache = new Map();  // cacheKey → confirmed working src URL
const activePreloads = new Set();    // cacheKeys currently being fetched
const failedVideoMap = new Map();    // track retry attempts per video
const MAX_CONCURRENT_PRELOADS = 1;   // Even more aggressive for Netlify
const LOAD_TIMEOUT_MS = 3000;        // 3 second timeout before showing error
const RETRY_DELAY_MS = 1000;         // Exponential backoff: 1s, 2s, 3s
const PRELOAD_MARGIN_PX = 1200;      // 1200px head start for aggressive preload

// ── Network speed detection hook ──────────────────────────────────────────────
function useNetworkStatus() {
  const getConn = () =>
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  const checkSlow = () => {
    const conn = getConn();
    if (!conn) return false;
    return ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
  };

  const [isSlowNetwork, setIsSlowNetwork] = React.useState(checkSlow);

  useEffect(() => {
    const conn = getConn();
    if (!conn) return;
    const handler = () => setIsSlowNetwork(checkSlow());
    conn.addEventListener('change', handler);
    return () => conn.removeEventListener('change', handler);
  }, []);

  return { isSlowNetwork };
}

// ── ReelCard ──────────────────────────────────────────────────────────────────
const ReelCard = ({ reel, isNearViewport = false }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const loadTimeoutRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  const [isMuted, setIsMuted] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState('');
  const [sourceCandidates, setCandidates] = React.useState([]);
  const [candidateIndex, setCandidateIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInViewport, setIsInViewport] = React.useState(false);
  const [loadTimeout, setLoadTimeout] = React.useState(false);
  const [posterImg, setPosterImg] = React.useState('');

  const { isSlowNetwork } = useNetworkStatus();

  const categoryFolderMap = {
    'Automotive':      'automotive',
    'BTS':             'BTS',
    'Real Estate':     'Real estate',
    'Saloon & Barber': 'saloon & barber',
    'Restaurant':      'Restaurants',
    'Lifestyle':       'Lifestyle',
    'Cinematic':       'cinematic',
  };

  // ── Build source candidates list ────────────────────────────────────────────
  useEffect(() => {
    const cacheKey = `${reel.category}-${reel.fileName}`;
    
    // Use cached source if available
    if (videoSourceCache.has(cacheKey)) {
      const cached = videoSourceCache.get(cacheKey);
      setCurrentSrc(cached);
      setCandidates([cached]);
      setIsLoading(false);
      return;
    }

    const folder = categoryFolderMap[reel.category] || '';
    const baseName = reel.fileName || `reel-${reel.id}`;
    
    // Set poster image - use thumbnail if available, else create a data URL gradient
    if (reel.thumbnail) {
      setPosterImg(reel.thumbnail);
    } else {
      // Create a gradient poster placeholder
      setPosterImg('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 568"><defs><linearGradient id="g"><stop offset="0%25" stop-color="%231a202c"/><stop offset="100%25" stop-color="%232d3748"/></linearGradient></defs><rect fill="url(%23g)" width="320" height="568"/></svg>');
    }

    const exts = ['.mp4', '.webm', '.mov'];
    const candidates = [];

    if (reel.video) candidates.push(reel.video);
    if (folder) {
      exts.forEach(ext =>
        candidates.push(`/videos/${encodeURIComponent(folder)}/${encodeURIComponent(baseName)}${ext}`)
      );
      if (reel.category === 'Restaurant') {
        exts.forEach(ext =>
          candidates.push(`/videos/Restaurants/Pending/${encodeURIComponent(baseName)}${ext}`)
        );
      }
    }

    setCandidates(candidates);
    setCandidateIndex(0);
    
    // Initialize retry count
    if (!failedVideoMap.has(cacheKey)) {
      failedVideoMap.set(cacheKey, 0);
    }
  }, [reel]);

  // ── Aggressive load trigger: hover, near-viewport, or in-viewport ──────────────
  const attemptLoad = useCallback(() => {
    if (currentSrc || hasError || sourceCandidates.length === 0) return;
    
    const cacheKey = `${reel.category}-${reel.fileName}`;
    
    // Throttle preloads for Netlify bandwidth
    if (activePreloads.size >= MAX_CONCURRENT_PRELOADS && !isInViewport && !isHovered) {
      return;
    }

    activePreloads.add(cacheKey);
    setIsLoading(true);
    setLoadTimeout(false);
    setCurrentSrc(sourceCandidates[0]);

    // Start load timeout timer
    loadTimeoutRef.current = setTimeout(() => {
      setLoadTimeout(true);
      console.warn(`Video ${cacheKey} took too long to start buffering`);
    }, LOAD_TIMEOUT_MS);
  }, [currentSrc, hasError, sourceCandidates, reel, isInViewport, isHovered]);

  // Hover → load immediately
  useEffect(() => {
    if (isHovered) {
      attemptLoad();
    }
  }, [isHovered, attemptLoad]);

  // Near viewport → load soon
  useEffect(() => {
    if (isNearViewport && !isLoading) {
      attemptLoad();
    }
  }, [isNearViewport, isLoading, attemptLoad]);

  // ── Viewport observer: play/pause + urgent load ───────────────────────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const inView = entry.isIntersecting;
          setIsInViewport(inView);

          if (inView) {
            // Urgent load if not started
            if (!currentSrc && sourceCandidates.length > 0 && !isLoading) {
              attemptLoad();
            }
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [currentSrc, sourceCandidates, isLoading, attemptLoad]);

  // ── Reactively set video preload attribute ───────────────────────────────────
  useEffect(() => {
    if (!videoRef.current) return;
    if (isInViewport || isHovered) {
      videoRef.current.preload = 'auto';
    } else if (isNearViewport) {
      videoRef.current.preload = isSlowNetwork ? 'none' : 'metadata';
    } else {
      videoRef.current.preload = 'none';
    }
  }, [isInViewport, isHovered, isNearViewport, isSlowNetwork]);

  // ── Event handlers ───────────────────────────────────────────────────────────
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(m => !m);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const handleVideoError = () => {
    const cacheKey = `${reel.category}-${reel.fileName}`;
    let retryCount = failedVideoMap.get(cacheKey) || 0;
    retryCount += 1;
    failedVideoMap.set(cacheKey, retryCount);

    console.error(`Video ${cacheKey} error (attempt ${retryCount})`);

    // Clear timeout
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setLoadTimeout(false);

    // Max retries reached
    if (retryCount > 3) {
      videoSourceCache.delete(cacheKey);
      activePreloads.delete(cacheKey);
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Try next candidate
    const nextIndex = candidateIndex + 1;
    if (sourceCandidates[nextIndex]) {
      setCandidateIndex(nextIndex);
      setCurrentSrc(sourceCandidates[nextIndex]);
    } else {
      // All candidates failed, retry first one with exponential backoff
      retryTimeoutRef.current = setTimeout(() => {
        setCandidateIndex(0);
        setCurrentSrc(sourceCandidates[0]);
      }, RETRY_DELAY_MS * retryCount);
    }
  };

  const handleVideoCanPlay = () => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    
    setIsLoading(false);
    setLoadTimeout(false);
    
    const cacheKey = `${reel.category}-${reel.fileName}`;
    if (currentSrc && !videoSourceCache.has(cacheKey)) {
      videoSourceCache.set(cacheKey, currentSrc);
    }
    activePreloads.delete(cacheKey);

    // Auto-play if in viewport
    if (videoRef.current && isInViewport) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  const preloadAttr = isInViewport || isHovered
    ? 'auto'
    : isNearViewport && !isSlowNetwork
      ? 'metadata'
      : 'none';

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blur-up animated placeholder shown while video loads */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundImage: posterImg ? `url(${posterImg})` : 'linear-gradient(135deg, #1a202c, #2d3748)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />

      {!hasError && currentSrc ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          poster={posterImg}
          loop
          muted={isMuted}
          playsInline
          preload={preloadAttr}
          onError={handleVideoError}
          onCanPlay={handleVideoCanPlay}
          onLoadedData={() => {
            if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
            setIsLoading(false);
            setLoadTimeout(false);
            if (videoRef.current && isInViewport) {
              videoRef.current.play().catch(() => {});
            }
          }}
        >
          <source src={currentSrc} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      ) : reel.thumbnail ? (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
          <Play className="w-16 h-16 text-gray-500" />
        </div>
      )}

      {/* Loading spinner */}
      {isLoading && currentSrc && !hasError && !loadTimeout && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-white/60 animate-spin" />
        </div>
      )}

      {/* Load timeout error overlay */}
      {loadTimeout && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <AlertCircle className="w-10 h-10 text-orange-400 mx-auto mb-2" />
            <p className="text-white/80 text-xs font-medium">Still loading...</p>
          </div>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {!hasError && currentSrc && (
          <div className="flex justify-end">
            <button
              onClick={toggleMute}
              className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
            >
              {isMuted
                ? <VolumeX className="w-5 h-5 text-white" />
                : <Volume2 className="w-5 h-5 text-white" />
              }
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          {reel.title && (
            <h3 className="font-bold text-white text-lg drop-shadow-lg">
              {reel.title}
            </h3>
          )}
          <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            Reel #{reel.id}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── ReelsPortfolio ────────────────────────────────────────────────────────────
const ReelsPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [nearViewportReels, setNearViewportReels] = React.useState(new Set());

  const categories = [
    'All',
    'Automotive',
    'BTS',
    'Real Estate',
    'Saloon & Barber',
    'Restaurant',
    'Lifestyle',
    'Cinematic',
  ];

  const filteredReels = selectedCategory === 'All'
    ? reelsPortfolio
    : reelsPortfolio.filter(reel => reel.category === selectedCategory);

  // ── AGGRESSIVE: 1200px head-start observer for Netlify CDN ──────────────────
  useEffect(() => {
    const gridContainer = document.querySelector('[data-reel-grid]');
    if (!gridContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const reelId = entry.target.getAttribute('data-reel-id');
          setNearViewportReels(prev => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(reelId);
            else next.delete(reelId);
            return next;
          });
        });
      },
      { rootMargin: '1200px', threshold: 0 }  // ← Increased to 1200px for ultra-aggressive preload
    );

    const reelElements = gridContainer.querySelectorAll('[data-reel-id]');
    reelElements.forEach(el => observer.observe(el));
    return () => reelElements.forEach(el => observer.unobserve(el));
  }, [filteredReels]);

  return (
    <section id="work" className="py-24 px-6 bg-gradient-to-b from-white to-[#FFFBF0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-black">Our </span>
            <span className="bg-gradient-to-r from-[#FF9933] to-[#FF9933] bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            your brand & our creative touch built for social media.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-[#FF9933] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6" data-reel-grid>
          {filteredReels.map((reel) => (
            <div key={reel.id} data-reel-id={reel.id}>
              <ReelCard
                reel={reel}
                isNearViewport={nearViewportReels.has(String(reel.id))}
              />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button className="bg-[#FF9933] hover:bg-[#E68A2E] text-white font-semibold px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition">
            View full portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReelsPortfolio;
