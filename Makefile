.PHONY: help build test lint clean run-integration run-design run-capability docker-build docker-up docker-down

help: ## Display this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build all services
	@echo "Building all services..."
	@go build -o bin/integration-service ./cmd/integration-service
	@go build -o bin/design-service ./cmd/design-service
	@go build -o bin/capability-service ./cmd/capability-service
	@echo "Build complete!"

test: ## Run tests
	@echo "Running tests..."
	@go test -v ./...

test-coverage: ## Run tests with coverage
	@echo "Running tests with coverage..."
	@go test -cover -coverprofile=coverage.out ./...
	@go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"

lint: ## Run linter
	@echo "Running linter..."
	@go vet ./...
	@go fmt ./...

clean: ## Clean build artifacts
	@echo "Cleaning..."
	@rm -rf bin/
	@rm -f coverage.out coverage.html
	@echo "Clean complete!"

run-integration: ## Run integration service
	@echo "Starting integration service..."
	@go run ./cmd/integration-service/main.go

run-design: ## Run design service
	@echo "Starting design service..."
	@go run ./cmd/design-service/main.go

run-capability: ## Run capability service
	@echo "Starting capability service..."
	@go run ./cmd/capability-service/main.go

docker-build: ## Build Docker images
	@echo "Building Docker images..."
	@docker-compose build

docker-up: ## Start all services with Docker Compose
	@echo "Starting services..."
	@docker-compose up -d
	@echo "Services started! Check status with: docker-compose ps"

docker-down: ## Stop all services
	@echo "Stopping services..."
	@docker-compose down

docker-logs: ## View Docker logs
	@docker-compose logs -f

mod-tidy: ## Tidy Go modules
	@echo "Tidying Go modules..."
	@go mod tidy

mod-download: ## Download Go modules
	@echo "Downloading Go modules..."
	@go mod download

install-tools: ## Install development tools
	@echo "Installing development tools..."
	@go install golang.org/x/tools/cmd/goimports@latest
	@echo "Tools installed!"
