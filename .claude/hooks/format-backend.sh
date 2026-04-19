#!/bin/bash
# Auto-format Python files in backend/ after agent edits.
# Uses "ruff format" only — it never removes imports or changes logic,
# so it is safe to run mid-edit when the agent hasn't finished writing code.
#
# Accepts both hook payload shapes:
#   - Cursor:      {"filePath": "..."}
#   - Claude Code: {"tool_input": {"file_path": "..."}, ...}

set -euo pipefail

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // .filePath // empty')

if [[ -z "$file_path" ]]; then
  exit 0
fi

if [[ "$file_path" != backend/*.py && "$file_path" != */backend/*.py ]]; then
  exit 0
fi

if [[ ! -f "$file_path" ]]; then
  exit 0
fi

ruff_bin="backend/.venv/bin/ruff"
if [[ ! -x "$ruff_bin" ]]; then
  exit 0
fi

"$ruff_bin" format --quiet "$file_path" 2>/dev/null || true

exit 0
