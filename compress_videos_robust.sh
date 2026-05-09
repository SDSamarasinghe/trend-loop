#!/bin/bash

# Video Optimization Script for Netlify - ROBUST VERSION
# Handles filenames with spaces and special characters
# Usage: bash compress_videos_robust.sh

VIDEOS_DIR="/Users/sadish/Documents/trend-loop/public/videos"

echo "🎬 Video Compression Script for Netlify (Robust)"
echo "=================================================="
echo ""

# Verify FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Install with: brew install ffmpeg"
    exit 1
fi

echo "✓ FFmpeg version: $(ffmpeg -version | head -n1 | cut -d' ' -f3)"
echo ""

# Count videos
TOTAL=$(find "$VIDEOS_DIR" -name "*.mp4" -type f | wc -l)
CURRENT=0

echo "📊 Found $TOTAL MP4 files"
echo "⏱️  This will take several minutes..."
echo "=================================================="
echo ""

# Process each video
find "$VIDEOS_DIR" -name "*.mp4" -type f -print0 | while IFS= read -r -d '' VIDEO; do
    CURRENT=$((CURRENT + 1))
    FILENAME=$(basename "$VIDEO")
    DIR=$(dirname "$VIDEO")
    
    # Get original size
    ORIG_SIZE=$(du -h "$VIDEO" | cut -f1)
    
    echo "[$CURRENT/$TOTAL] $FILENAME"
    echo "  Original: $ORIG_SIZE"
    
    # Create temp output file
    TMPFILE="$DIR/.${FILENAME%.mp4}_tmp.mp4"
    
    # Compress with error handling
    if ffmpeg -i "$VIDEO" \
        -vcodec libx264 \
        -crf 26 \
        -preset fast \
        -vf "scale=720:-2" \
        -acodec aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$TMPFILE" 2>&1 | grep -v "frame=" | grep -v "fps=" > /dev/null; then
        
        if [ -f "$TMPFILE" ]; then
            NEW_SIZE=$(du -h "$TMPFILE" | cut -f1)
            
            # Compare file sizes (use bytes for comparison)
            ORIG_BYTES=$(stat -f%z "$VIDEO" 2>/dev/null || stat -c%s "$VIDEO")
            NEW_BYTES=$(stat -f%z "$TMPFILE" 2>/dev/null || stat -c%s "$TMPFILE")
            
            if [ "$NEW_BYTES" -lt "$ORIG_BYTES" ]; then
                rm "$VIDEO"
                mv "$TMPFILE" "$VIDEO"
                REDUCTION=$(echo "scale=1; (1 - $NEW_BYTES/$ORIG_BYTES) * 100" | bc)
                echo "  ✓ Compressed: $ORIG_SIZE → $NEW_SIZE ($REDUCTION% reduction)"
            else
                rm "$TMPFILE"
                echo "  ⚠ Original smaller, keeping original: $ORIG_SIZE"
            fi
        fi
    else
        rm -f "$TMPFILE"
        echo "  ❌ Compression failed"
    fi
    
    echo ""
done

echo ""
echo "✅ Compression complete!"
echo ""
echo "📊 Summary:"
echo "==========="
COMPRESSED=$(find "$VIDEOS_DIR" -name "*.mp4" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$VIDEOS_DIR" | cut -f1)
echo "Total files: $COMPRESSED"
echo "Total size: $TOTAL_SIZE"
echo ""
echo "📤 Next steps:"
echo "1. Test locally: npm start"
echo "2. Build: npm run build"
echo "3. Deploy: netlify deploy --prod"
echo ""
