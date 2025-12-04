# DELM - Design Experience Language Model

A RAG-powered Small Language Model system for generating UI components, styles, and layouts. Optimized for Apple Silicon.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   User Prompt   │────▶│  RAG Pipeline    │────▶│   Output    │
└─────────────────┘     │                  │     └─────────────┘
                        │  ┌────────────┐  │
                        │  │ Embeddings │  │
                        │  └─────┬──────┘  │
                        │        │         │
                        │  ┌─────▼──────┐  │
                        │  │ Vector DB  │  │
                        │  │ (ChromaDB) │  │
                        │  └─────┬──────┘  │
                        │        │         │
                        │  ┌─────▼──────┐  │
                        │  │  Small LLM │  │
                        │  │ (Phi-3/MLX)│  │
                        │  └────────────┘  │
                        └──────────────────┘
```

## Features

- **RAG-Enhanced Generation**: Retrieves relevant design patterns to improve output quality
- **Apple Silicon Optimized**: Uses MLX for efficient inference on M1/M2/M3 chips
- **Multiple Output Types**: Components, styles, layouts, design tokens
- **Extensible Pattern Library**: Easily add your own design patterns
- **REST API**: Simple HTTP endpoints for integration

## Requirements

- Python 3.9+
- Apple Silicon Mac (M1/M2/M3) with 8GB+ unified memory
- ~4GB disk space for model

## Quick Start

```bash
# Start the server (will install dependencies on first run)
./start.sh

# Stop the server
./stop.sh
```

## API Usage

### Generate a Component

```bash
curl -X POST http://127.0.0.1:3005/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a responsive navigation bar with dropdown menus",
    "type": "component"
  }'
```

### Add a Design Pattern

```bash
curl -X POST http://127.0.0.1:3005/patterns \
  -H "Content-Type: application/json" \
  -d '{
    "pattern_id": "comp-custom-001",
    "name": "Custom Alert",
    "category": "components",
    "content": "... your component code ...",
    "tags": ["alert", "notification"]
  }'
```

### Search Patterns

```bash
curl -X POST http://127.0.0.1:3005/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "button with loading state",
    "top_k": 3
  }'
```

## Configuration

Edit `config.yaml` to customize:

- **Model**: Change the LLM (default: Phi-3 Mini 4-bit)
- **Embeddings**: Change embedding model
- **RAG Settings**: Adjust top_k, similarity threshold
- **Categories**: Add custom pattern categories

### Available Models (Apple Silicon)

| Model | Size | Memory | Speed |
|-------|------|--------|-------|
| Phi-3 Mini 4-bit | 2.4GB | ~4GB | Fast |
| Llama 3.2 1B 4-bit | 1.2GB | ~2GB | Fastest |
| Qwen2.5 1.5B 4-bit | 1.5GB | ~3GB | Fast |

## Project Structure

```
delm/
├── src/
│   ├── api.py          # FastAPI server
│   ├── embeddings.py   # Embedding service
│   ├── model.py        # LLM interface
│   ├── rag.py          # RAG pipeline
│   └── vector_store.py # ChromaDB interface
├── data/
│   ├── chromadb/       # Vector database storage
│   └── seed_patterns.py # Initial patterns
├── config.yaml         # Configuration
├── requirements.txt    # Dependencies
└── start.sh / stop.sh  # Scripts
```

## Expanding the Pattern Library

### Best Practices for Patterns

1. **Complete Examples**: Include full, working code
2. **TypeScript**: Use proper type definitions
3. **Tailwind CSS**: Consistent styling approach
4. **Accessibility**: Include ARIA labels, keyboard support
5. **Responsive**: Mobile-first design

### Categories

- `components` - Reusable UI components
- `layouts` - Page structures
- `styles` - CSS/design tokens
- `animations` - Motion and transitions
- `accessibility` - A11y patterns

## Troubleshooting

### Model Download Issues

First run downloads the model (~2-4GB). If interrupted:
```bash
rm -rf ~/.cache/huggingface/hub/models--mlx-community--*
./start.sh
```

### Memory Issues

If you get OOM errors, try a smaller model in `config.yaml`:
```yaml
model:
  name: "mlx-community/Llama-3.2-1B-Instruct-4bit"
```

### Slow First Response

First inference is slower due to model compilation. Subsequent requests are faster.

## Integration with ESLM UI

The DELM API runs on port 3005, which the ESLM React app proxies to automatically.

## License

BALUT Workspace - ESLM Project
