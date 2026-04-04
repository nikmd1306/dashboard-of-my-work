.PHONY: setup dev stop status lint help

help: ## Show this help
	@echo ""
	@echo "  Work Dashboard — commands"
	@echo "  ─────────────────────────────────────────────────"
	@echo ""
	@echo "  make setup    One-time initial setup (run first)"
	@echo "  make dev      Start everything (Ctrl+C to stop)"
	@echo "  make stop     Force-stop everything"
	@echo "  make status   Check what is running"
	@echo "  make lint     Run linters"
	@echo ""

# ── One-time setup ──────────────────────────────────────

setup:
	@echo "==> Setting up git hooks..."
	@git config core.hooksPath .githooks
	@echo "    Hooks ready."
	@echo ""
	@echo "==> Setting up backend..."
	@cd backend && python3 -m venv .venv
	@cd backend && .venv/bin/pip install --quiet -r requirements.txt
	@test -f backend/.env || cp backend/.env.example backend/.env
	@echo "    Backend ready."
	@echo ""
	@echo "==> Setting up frontend..."
	@cd frontend && npm install --silent
	@test -f frontend/.env.local || cp frontend/.env.example frontend/.env.local
	@echo "    Frontend ready."
	@echo ""
	@echo "==> Done. Run: make dev"
	@echo ""

# ── Development ─────────────────────────────────────────

dev:
	@bash -c ' \
		docker compose up -d --quiet-pull; \
		(cd backend && exec .venv/bin/uvicorn app.main:app --reload --port 8000) > backend/server.log 2>&1 & \
		BACKEND_PID=$$!; \
		trap "echo; echo \"  Stopping all services...\"; kill $$BACKEND_PID 2>/dev/null; wait $$BACKEND_PID 2>/dev/null; docker compose down -t 2 >/dev/null 2>&1; echo \"  All stopped.\"" EXIT; \
		sleep 2; \
		echo ""; \
		echo "  All services running:"; \
		echo "  Frontend  http://localhost:3000"; \
		echo "  API docs  http://localhost:8000/docs"; \
		echo ""; \
		echo "  Backend logs: backend/server.log"; \
		echo "  Press Ctrl+C to stop everything"; \
		echo ""; \
		cd frontend && exec npm run dev \
	'

# ── Lint ─────────────────────────────────────────────────

lint:
	@echo "==> Backend (ruff)..."
	@cd backend && .venv/bin/ruff check .
	@echo "==> Frontend (eslint)..."
	@cd frontend && npm run lint --silent
	@echo ""
	@echo "All checks passed."

# ── Stop ────────────────────────────────────────────────

stop:
	@lsof -ti :8000 | xargs kill -9 2>/dev/null || true
	@lsof -ti :3000 | xargs kill -9 2>/dev/null || true
	@docker compose down -t 2 >/dev/null 2>&1 || true
	@echo "All stopped."

# ── Status ──────────────────────────────────────────────

status:
	@echo ""
	@echo "  Database:"
	@docker compose ps --format "    {{.Name}}  {{.Status}}" 2>/dev/null || echo "    not running"
	@echo ""
	@echo "  Backend (port 8000):"
	@lsof -i :8000 -sTCP:LISTEN >/dev/null 2>&1 && echo "    running  http://localhost:8000/docs" || echo "    not running"
	@echo ""
	@echo "  Frontend (port 3000):"
	@lsof -i :3000 -sTCP:LISTEN >/dev/null 2>&1 && echo "    running  http://localhost:3000" || echo "    not running"
	@echo ""
