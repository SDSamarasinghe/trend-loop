# Video Optimization Guide for Netlify

## Current Code Improvements
✅ **Implemented in ReelsPortfolio.jsx:**
- Poster images (blurred while loading)
- Loading spinner & timeout detection (4s)
- Aggressive preload (800px margin before viewport)
- Network speed detection (slow 2G/3G optimization)
- Exponential backoff retry strategy
- Netlify CDN cache headers (1 year)
- Single concurrent preload (saves bandwidth)

---

## CRITICAL: Compress Your Video Files

This is the **#1 bottleneck** for Netlify hosting. Your videos are probably **10–50 MB** when they should be **3–8 MB**.

### Prerequisites
```bash
# Install FFmpeg (macOS)
brew install ffmpeg

# Verify installation
ffmpeg -version
```

---

## Compression Commands

### Option 1: HIGH QUALITY (Recommended for most reels)
```bash
ffmpeg -i "input.mp4" \
  -vcodec libx264 \
  -crf 26 \
  -preset fast \
  -vf "scale=720:-2" \
  -acodec aac \
  -b:a 128k \
  -movflags +faststart \
  "output_optimized.mp4"
```

**Results:** ~5-8 MB per 60s reel
- **-crf 26**: Quality (18-28; lower = better, slower)
- **-vf scale=720:-2**: Resize to 720px width (maintains aspect ratio)
- **+faststart**: Moves metadata to front for faster streaming

---

### Option 2: FAST COMPRESSION (For lower end devices)
```bash
ffmpeg -i "input.mp4" \
  -vcodec libx264 \
  -crf 28 \
  -preset superfast \
  -vf "scale=480:-2" \
  -acodec aac \
  -b:a 96k \
  -movflags +faststart \
  "output_mobile.mp4"
```

**Results:** ~2-4 MB per 60s reel
- Good for slow connections (2G/3G)

---

### Batch Compress All Videos

**For one category folder:**
```bash
cd /Users/sadish/Documents/trend-loop/public/videos/automotive

for f in *.mp4; do
  echo "Compressing: $f"
  ffmpeg -i "$f" \
    -vcodec libx264 -crf 26 -preset fast \
    -vf "scale=720:-2" \
    -acodec aac -b:a 128k \
    -movflags +faststart \
    "${f%.mp4}_opt.mp4"
done

# Remove originals and rename optimized files
rm *.mp4
for f in *_opt.mp4; do mv "$f" "${f/_opt/}"; done
```

**For ALL videos (run from videos folder):**
```bash
cd /Users/sadish/Documents/trend-loop/public/videos

find . -name "*.mp4" -not -name "*_opt.mp4" | while read f; do
  dir=$(dirname "$f")
  name=$(basename "$f" .mp4)
  
  echo "Compressing: $f"
  ffmpeg -i "$f" \
    -vcodec libx264 -crf 26 -preset fast \
    -vf "scale=720:-2" \
    -acodec aac -b:a 128k \
    -movflags +faststart \
    "$dir/${name}_opt.mp4"
done

# Cleanup
find . -name "*.mp4" -not -name "*_opt.mp4" -delete
find . -name "*_opt.mp4" -exec bash -c 'mv "$1" "${1/_opt/}"' _ {} \;
```

---

## Verification

**Check file size reduction:**
```bash
# Before compression
ls -lh /Users/sadish/Documents/trend-loop/public/videos/*/

# After compression (compare sizes)
```

**Target size per video:**
| Duration | Max Size | Bitrate |
|----------|----------|---------|
| 15-30s   | 2-3 MB   | 400-800 kbps |
| 30-60s   | 4-8 MB   | 800-1200 kbps |
| 60-120s  | 10-15 MB | 1200-1800 kbps |

---

## Upload to Netlify

```bash
# After compression, rebuild & deploy
npm run build

# Deploy to Netlify
netlify deploy --prod
```

---

## Monitor Performance

**Netlify Analytics:**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click your site → **Analytics**
3. Check **Bandwidth** usage (videos should use ~60-70% of bandwidth if properly compressed)
4. Monitor **Request time** for `/videos/` endpoints

**Browser DevTools:**
1. Open Inspector → **Network** tab
2. Scroll through reels and watch video load times
3. Target: **< 2 seconds** to buffering indicator

---

## Advanced: Multi-Quality Streaming (Optional)

If you want adaptive bitrate loading:

```bash
# Create low-quality version (mobile)
ffmpeg -i "input.mp4" \
  -vcodec libx264 -crf 30 -preset fast \
  -vf "scale=360:-2" -b:a 64k -movflags +faststart \
  "output_360p.mp4"

# Create medium-quality version (tablets)
ffmpeg -i "input.mp4" \
  -vcodec libx264 -crf 28 -preset fast \
  -vf "scale=540:-2" -b:a 96k -movflags +faststart \
  "output_540p.mp4"

# Create high-quality version (desktop)
ffmpeg -i "input.mp4" \
  -vcodec libx264 -crf 26 -preset fast \
  -vf "scale=720:-2" -b:a 128k -movflags +faststart \
  "output_720p.mp4"
```

---

## Troubleshooting

**Videos still loading slowly after compression?**
1. Check Netlify bandwidth limits (free tier: 100 GB/month)
2. Use Chrome DevTools → Throttle network to "Slow 3G" and test
3. Enable Gzip compression in Netlify (automatically done for HTML/CSS/JS, but not video)
4. Consider Cloudinary/AWS S3 for video CDN (separate from Netlify)

**Videos not playing?**
1. Verify `+faststart` flag was used during encoding
2. Test locally: `npm run build && npm start`
3. Check browser console for CORS errors
4. Ensure videos exist in `/public/videos/` before build

**High bandwidth usage?**
1. Reduce quality (increase `-crf` to 28-30)
2. Lower resolution (scale to 480p or 360p)
3. Reduce audio bitrate (use `-b:a 96k` or lower)
4. Consider Netlify's paid plans for more bandwidth

---

## Next Steps

1. **Immediate:** Compress videos using the batch script above
2. **Deploy:** `npm run build && netlify deploy --prod`
3. **Monitor:** Check Netlify analytics for bandwidth improvement
4. **Iterate:** If still slow, use Option 2 (Fast Compression) instead

**Expected result:** 50-70% reduction in load time after compression ⚡
