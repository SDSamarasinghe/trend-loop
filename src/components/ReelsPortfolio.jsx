import React, { useRef, useEffect, useCallback } from 'react';
import { Play, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { reelsPortfolio } from '../data/mock';

// ── Global caches (module-level, survive re-renders) ──────────────────────────
const videoSourceCache = new Map();  // cacheKey → confirmed working src URL
const activePreloads = new Set();    // cacheKeys currently being fetched
const MAX_CONCURRENT_PRELOADS = 2;

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
  const cardRef  = useRef(null);
  const retryRef = useRef(0);

  const [isMuted, setIsMuted]                 = React.useState(true);
  const [isHovered, setIsHovered]             = React.useState(false);
  const [hasError, setHasError]               = React.useState(false);
  const [currentSrc, setCurrentSrc]           = React.useState('');
  const [sourceCandidates, setCandidates]     = React.useState([]);
  const [candidateIndex, setCandidateIndex]   = React.useState(0);
  const [isLoading, setIsLoading]             = React.useState(true);
  const [isInViewport, setIsInViewport]       = React.useState(false);

  const { isSlowNetwork } = useNetworkStatus();

  const categoryFolderMap = {
    'Automotive':    'automotive',
    'BTS':           'BTS',
    'Real Estate':   'Real estate',
    'Saloon & Barber': 'saloon & barber',
    'Restaurant':    'Restaurants',
    'Lifestyle':     'Lifestyle',
    'Cinematic':     'cinematic',
  };

  // ── Build source candidates list ────────────────────────────────────────────
  useEffect(() => {
    const cacheKey = `${reel.category}-${reel.fileName}`;
    if (videoSourceCache.has(cacheKey)) {
      const cached = videoSourceCache.get(cacheKey);
      setCurrentSrc(cached);
      setCandidates([cached]);
      setIsLoading(false);
      return;
    }

    const folder   = categoryFolderMap[reel.category] || '';
    const baseName = reel.fileName || `reel-${reel.id}`;
    const exts     = ['.mp4', '.webm', '.mov'];
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
    retryRef.current = 0;
  }, [reel]);

  // ── Load src when ready (hover / near-viewport / in-viewport) ───────────────
  const loadSrc = useCallback(() => {
    if (currentSrc || hasError || sourceCandidates.length === 0) return;
    const cacheKey = `${reel.category}-${reel.fileName}`;
    // Throttle: don't start a new preload if at max and not urgently needed
    if (
      activePreloads.size >= MAX_CONCURRENT_PRELOADS &&
      !isInViewport &&
      !isHovered
    ) return;
    activePreloads.add(cacheKey);
    setCurrentSrc(sourceCandidates[0]);
  }, [currentSrc, hasError, sourceCandidates, reel, isInViewport, isHovered]);

  // Hover → start loading immediately
  useEffect(() => {
    if (isHovered) loadSrc();
  }, [isHovered, loadSrc]);

  // Near viewport (500 px margin) → start loading
  useEffect(() => {
    if (isNearViewport) loadSrc();
  }, [isNearViewport, loadSrc]);

  // ── Viewport observer: play / pause + urgently load if still missing ─────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const inView = entry.isIntersecting;
          setIsInViewport(inView);

          if (inView) {
            // Urgent load if somehow not started yet
            if (!currentSrc && sourceCandidates.length > 0) {
              setCurrentSrc(sourceCandidates[0]);
            }
            if (videoRef.current) {
              videoRef.current.preload = 'auto';
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
  }, [currentSrc, sourceCandidates]);

  // ── Reactively update <video preload> attribute ──────────────────────────────
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
    retryRef.current += 1;
    const cacheKey = `${reel.category}-${reel.fileName}`;

    if (retryRef.current > 3) {
      videoSourceCache.delete(cacheKey);
      activePreloads.delete(cacheKey);
      setHasError(true);
      return;
    }

    const nextIndex = candidateIndex + 1;
    if (sourceCandidates[nextIndex]) {
      setCandidateIndex(nextIndex);
      setCurrentSrc(sourceCandidates[nextIndex]);
    } else {
      activePreloads.delete(cacheKey);
      setHasError(true);
    }
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    const cacheKey = `${reel.category}-${reel.fileName}`;
    if (currentSrc && !videoSourceCache.has(cacheKey)) {
      videoSourceCache.set(cacheKey, currentSrc);
    }
    activePreloads.delete(cacheKey);
    if (isInViewport && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

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
        className={`absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 transition-opacity duration-500 ${
          isLoading ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'
        }`}
      />

      {!hasError && currentSrc ? (
        <video
          ref={videoRef}
          src={currentSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loop
          muted={isMuted}
          playsInline
          preload={preloadAttr}
          onError={handleVideoError}
          onCanPlay={handleVideoCanPlay}
          onLoadedData={() => {
            setIsLoading(false);
            if (videoRef.current && isInViewport) {
              videoRef.current.play().catch(() => {});
            }
          }}
        />
      ) : reel.thumbnail ? (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-16 h-16 text-gray-500" />
        </div>
      )}

      {/* Spinner: visible while src is set but video hasn't decoded yet */}
      {isLoading && currentSrc && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-white/60 animate-spin" />
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

  // 500 px head-start observer — tells ReelCard to begin fetching early
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
      { rootMargin: '500px', threshold: 0 }
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
