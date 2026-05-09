#!/bin/bash

# Video Optimization Script for Netlify
# This script compresses all MP4 videos in /public/videos to optimal Netlify sizes
# Usage: bash compress_videos.sh

set -e  # Exit on error

VIDEOS_DIR="/Users/sadish/Documents/trend-loop/public/videos"
BACKUP_DIR="/Users/sadish/Documents/trend-loop/public/videos_backup"

echo "🎬 Video Compression Script for Netlify"
echo "========================================"
echo ""

# Verify FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Install with: brew install ffmpeg"
    exit 1
fi

echo "✓ FFmpeg found: $(ffmpeg -version | head -n1)"
echo ""

# Create backup
if [ -d "$VIDEOS_DIR" ]; then
    echo "📦 Creating backup..."
    mkdir -p "$BACKUP_DIR"
    cp -r "$VIDEOS_DIR"/* "$BACKUP_DIR"/ 2>/dev/null || true
    echo "✓ Backup created at: $BACKUP_DIR"
    echo ""
fi

# Count total videos
TOTAL=$(find "$VIDEOS_DIR" -name "*.mp4" -type f | wc -l)
CURRENT=0

echo "📊 Found $TOTAL MP4 files to compress"
echo "========================================"
echo ""

# Compress each video
find "$VIDEOS_DIR" -name "*.mp4" -type f | while read VIDEO; do
    CURRENT=$((CURRENT + 1))
    FILENAME=$(basename "$VIDEO")
    FILESIZE_BEFORE=$(du -h "$VIDEO" | cut -f1)
    
    echo "[$CURRENT/$TOTAL] Compressing: $FILENAME (Before: $FILESIZE_BEFORE)"
    
    # Compress with high quality (CRF 26)
    ffmpeg -i "$VIDEO" \
        -vcodec libx264 \
        -crf 26 \
        -preset fast \
        -vf "scale=720:-2" \
        -acodec aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$VIDEO.tmp.mp4" 2>/dev/null
    
    # Check if compression was successful
    if [ -f "$VIDEO.tmp.mp4" ]; then
        FILESIZE_AFTER=$(du -h "$VIDEO.tmp.mp4" | cut -f1)
        
        # Only replace if new file is smaller
        if [ $(stat -f%z "$VIDEO.tmp.mp4") -lt $(stat -f%z "$VIDEO") ]; then
            rm "$VIDEO"
            mv "$VIDEO.tmp.mp4" "$VIDEO"
            echo "   ✓ Compressed: $FILESIZE_BEFORE → $FILESIZE_AFTER"
        else
            rm "$VIDEO.tmp.mp4"
            echo "   ⚠ Original was smaller, keeping original: $FILESIZE_BEFORE"
        fi
    else
        echo "   ❌ Compression failed for $FILENAME"
    fi
    
    echo ""
done

echo "✅ Compression complete!"
echo ""
echo "📊 Summary:"
echo "==========="
echo "Total files processed: $(find "$VIDEOS_DIR" -name "*.mp4" -type f | wc -l)"
echo "Backup location: $BACKUP_DIR"
echo ""
echo "📤 Next steps:"
echo "1. Verify videos play correctly locally"
echo "2. Run: npm run build"
echo "3. Deploy: netlify deploy --prod"
echo "4. Monitor bandwidth in Netlify dashboard"
echo ""
