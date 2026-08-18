#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
version="${1:-v0.0.1-beta.0}"
source_release="${ANYTTY_SOURCE_RELEASE:-anytty/anytty}"
asset_dir="$repo_root/.artifacts/release/$version"

if [[ -d "$asset_dir" ]] && compgen -G "$asset_dir/*" >/dev/null; then
  echo "release assets already present in $asset_dir" >&2
  exit 0
fi

mkdir -p "$asset_dir"

api="https://api.github.com/repos/$source_release/releases/tags/$version"
assets="$(curl -fsSL "$api" | python3 -c '
import json, sys
data = json.load(sys.stdin)
for a in data.get("assets", []):
    print(a["browser_download_url"])
')"

echo "$assets" | while read -r url; do
  echo "downloading $(basename "$url")"
  curl -fsSL -o "$asset_dir/$(basename "$url")" "$url"
done

cd "$asset_dir"
LC_ALL=C shasum -a 256 anytty-* BUILD_INFO.txt >SHA256SUMS
printf 'downloaded %s release assets\n' "$version"
