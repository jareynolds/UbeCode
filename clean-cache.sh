 # Check disk space
  df -h

  # Clear npm/yarn cache
  npm cache clean --force

  # Clear temp files
  rm -rf /var/folders/hf/fc7t89652lgbpxmfr58tcs0m0000gn/T/*

  # Clear Go build cache
  go clean -cache

#1. Empty Trash: 
rm -rf ~/.Trash/*
#2. Clear npm/yarn cache:
  npm cache clean --force
  yarn cache clean
#3. Clear Docker (often takes lots of space):
  docker system prune -a
#4. Find large files:
  du -sh ~/Library/Caches/*
  du -sh ~/node_modules 2>/dev/null
#5. Clear Xcode derived data (if applicable):
  rm -rf ~/Library/Developer/Xcode/DerivedData


