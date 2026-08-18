#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
version="${1:-v0.0.1-beta.0}"
asset_dir="$repo_root/.artifacts/release/$version"

if [[ ! -d "$asset_dir" ]]; then
  echo "release assets not found: $asset_dir" >&2
  echo "run scripts/fetch-release-assets.sh first" >&2
  exit 1
fi

tag="${version}"

if ! gh auth status >/dev/null 2>&1; then
  echo "gh is not authenticated. Run: gh auth login" >&2
  exit 1
fi

notes="$repo_root/.artifacts/release/${version}-notes.md"
if [[ -f "$notes" ]]; then
  notes_args=(--notes-file "$notes")
else
  notes_args=(--notes "AnyTTY ${version}")
fi

gh release create "$tag" \
  "$asset_dir"/* \
  --repo anytty/anytty-site \
  --target main \
  --prerelease \
  --title "AnyTTY ${version}" \
  "${notes_args[@]}"
