#!/usr/bin/env bash
# Run this after you merge a PR on GitHub.
# Usage: ./scripts/pr-merged.sh [branch-name]
# If branch-name is omitted, uses the current branch (so run this while still on the feature branch).

set -e
BRANCH="${1:-$(git branch --show-current)}"
if [ -z "$BRANCH" ] || [ "$BRANCH" = "main" ]; then
  echo "Usage: ./scripts/pr-merged.sh <branch-name>"
  echo "Or run from the feature branch: ./scripts/pr-merged.sh"
  exit 1
fi
git checkout main
git pull origin main
git push origin --delete "$BRANCH"
echo "Done: main updated, remote branch '$BRANCH' deleted."
