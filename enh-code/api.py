"""
FastAPI server for DELM
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import yaml

from .rag import RAGPipeline
from .image_generator import get_image_generator
from .svg_generator import get_svg_generator
from .sd_generator import get_sd_generator

app = FastAPI(
    title="DELM API",
    description="Design Experience Language Model API",
    version="1.2.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG pipeline
rag_pipeline = None

@app.on_event("startup")
async def startup_event():
    global rag_pipeline
    rag_pipeline = RAGPipeline()

# Request/Response models
class GenerateRequest(BaseModel):
    prompt: str
    type: str = "component"  # component, styles, layout
    category: Optional[str] = None

class GenerateResponse(BaseModel):
    output: str
    patterns_used: int
    pattern_ids: List[str]

class PatternRequest(BaseModel):
    pattern_id: str
    content: str
    category: str
    name: str
    tags: Optional[List[str]] = None

class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    top_k: int = 5

class ImageGenerateRequest(BaseModel):
    prompt: str
    width: int = 800
    height: int = 600
    format: str = "base64"  # "base64" or "binary"

class ComponentMockupRequest(BaseModel):
    component_type: str  # button, card, input, navbar
    props: Dict[str, Any] = {}
    width: int = 400
    height: int = 300
    format: str = "base64"

class CodeToImageRequest(BaseModel):
    code: str
    width: int = 800
    height: int = 600
    format: str = "base64"

class IconRequest(BaseModel):
    name: str
    size: int = 24
    color: str = "currentColor"
    stroke_width: float = 2
    format: str = "svg"  # svg or png

class SymbolRequest(BaseModel):
    symbol_type: str  # circle, hexagon, star, diamond, triangle, ring, badge
    size: int = 64
    primary_color: str = "#3b82f6"
    secondary_color: str = "#60a5fa"
    format: str = "svg"

class LogoRequest(BaseModel):
    description: str
    style: str = "modern"  # modern, vintage, playful, tech, organic, bold
    width: int = 512
    height: int = 512
    format: str = "base64"

class IllustrationRequest(BaseModel):
    description: str
    style: str = "digital"  # digital, watercolor, vector, sketch, isometric
    width: int = 768
    height: int = 512
    format: str = "base64"

class AIImageRequest(BaseModel):
    prompt: str
    width: int = 512
    height: int = 512
    num_steps: int = 4
    seed: Optional[int] = None
    format: str = "base64"

# Endpoints
@app.get("/")
async def root():
    return {"message": "DELM API is running", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": rag_pipeline is not None,
        "patterns_count": rag_pipeline.vector_store.count() if rag_pipeline else 0
    }

@app.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    """Generate UI component, styles, or layout"""
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        result = rag_pipeline.generate(
            prompt=request.prompt,
            generation_type=request.type,
            category=request.category
        )
        return GenerateResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/patterns")
async def add_pattern(request: PatternRequest):
    """Add a new design pattern to the knowledge base"""
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        rag_pipeline.add_pattern(
            pattern_id=request.pattern_id,
            content=request.content,
            category=request.category,
            name=request.name,
            tags=request.tags
        )
        return {"message": f"Pattern {request.pattern_id} added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
async def search_patterns(request: SearchRequest):
    """Search for design patterns"""
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        patterns = rag_pipeline.retrieve(
            query=request.query,
            category=request.category,
            top_k=request.top_k
        )
        return {"patterns": patterns, "count": len(patterns)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/patterns/count")
async def get_pattern_count():
    """Get total number of patterns in the database"""
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="Model not loaded")

    return {"count": rag_pipeline.vector_store.count()}

@app.get("/categories")
async def get_categories():
    """Get available pattern categories"""
    with open("config.yaml", 'r') as f:
        config = yaml.safe_load(f)
    return {"categories": config.get('categories', [])}

# Image Generation Endpoints

@app.post("/generate/image")
async def generate_image(request: ImageGenerateRequest):
    """Generate UI mockup image from prompt"""
    if not rag_pipeline:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        # First generate the code
        result = rag_pipeline.generate(
            prompt=request.prompt,
            generation_type="component"
        )

        # Then convert to image
        image_gen = get_image_generator()
        image_bytes = await image_gen.generate_from_code(
            result['output'],
            request.width,
            request.height
        )

        if request.format == "binary":
            return Response(
                content=image_bytes,
                media_type="image/png",
                headers={"Content-Disposition": "inline; filename=mockup.png"}
            )
        else:
            return {
                "image": image_gen.to_base64(image_bytes),
                "data_url": image_gen.to_data_url(image_bytes),
                "width": request.width,
                "height": request.height,
                "code": result['output']
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/mockup")
async def generate_mockup(request: ComponentMockupRequest):
    """Generate a simple component mockup image"""
    try:
        image_gen = get_image_generator()
        image_bytes = await image_gen.generate_component_mockup(
            request.component_type,
            request.props,
            request.width,
            request.height
        )

        if request.format == "binary":
            return Response(
                content=image_bytes,
                media_type="image/png",
                headers={"Content-Disposition": f"inline; filename={request.component_type}.png"}
            )
        else:
            return {
                "image": image_gen.to_base64(image_bytes),
                "data_url": image_gen.to_data_url(image_bytes),
                "width": request.width,
                "height": request.height,
                "component_type": request.component_type
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/code-to-image")
async def code_to_image(request: CodeToImageRequest):
    """Convert code to rendered image"""
    try:
        image_gen = get_image_generator()
        image_bytes = await image_gen.generate_from_code(
            request.code,
            request.width,
            request.height
        )

        if request.format == "binary":
            return Response(
                content=image_bytes,
                media_type="image/png",
                headers={"Content-Disposition": "inline; filename=rendered.png"}
            )
        else:
            return {
                "image": image_gen.to_base64(image_bytes),
                "data_url": image_gen.to_data_url(image_bytes),
                "width": request.width,
                "height": request.height
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# SVG Generation Endpoints

@app.get("/icons")
async def list_icons():
    """List all available icons"""
    svg_gen = get_svg_generator()
    return {"icons": svg_gen.list_available_icons()}

@app.post("/generate/icon")
async def generate_icon(request: IconRequest):
    """Generate an SVG icon"""
    try:
        svg_gen = get_svg_generator()
        svg_content = svg_gen.generate_icon(
            request.name,
            request.size,
            request.color,
            request.stroke_width
        )

        if request.format == "svg":
            return Response(
                content=svg_content,
                media_type="image/svg+xml"
            )
        else:
            # Convert SVG to PNG
            image_gen = get_image_generator()
            html = f'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%">{svg_content}</div>'
            image_bytes = await image_gen.html_to_png(html, request.size * 4, request.size * 4)

            if request.format == "binary":
                return Response(content=image_bytes, media_type="image/png")
            else:
                return {
                    "image": image_gen.to_base64(image_bytes),
                    "data_url": image_gen.to_data_url(image_bytes),
                    "name": request.name
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/symbol")
async def generate_symbol(request: SymbolRequest):
    """Generate a decorative symbol"""
    try:
        svg_gen = get_svg_generator()
        svg_content = svg_gen.generate_symbol(
            request.symbol_type,
            request.size,
            request.primary_color,
            request.secondary_color
        )

        if request.format == "svg":
            return Response(
                content=svg_content,
                media_type="image/svg+xml"
            )
        else:
            # Convert to PNG
            image_gen = get_image_generator()
            html = f'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%">{svg_content}</div>'
            image_bytes = await image_gen.html_to_png(html, request.size * 2, request.size * 2)

            if request.format == "binary":
                return Response(content=image_bytes, media_type="image/png")
            else:
                return {
                    "image": image_gen.to_base64(image_bytes),
                    "data_url": image_gen.to_data_url(image_bytes),
                    "symbol_type": request.symbol_type
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AI Image Generation Endpoints (Stable Diffusion)

@app.post("/generate/ai-image")
async def generate_ai_image(request: AIImageRequest):
    """Generate an image using Stable Diffusion"""
    try:
        sd_gen = get_sd_generator()
        image_bytes = sd_gen.generate(
            request.prompt,
            request.width,
            request.height,
            request.num_steps,
            request.seed
        )

        if image_bytes is None:
            raise HTTPException(status_code=500, detail="Image generation failed")

        if request.format == "binary":
            return Response(content=image_bytes, media_type="image/png")
        else:
            import base64
            b64 = base64.b64encode(image_bytes).decode('utf-8')
            return {
                "image": b64,
                "data_url": f"data:image/png;base64,{b64}",
                "width": request.width,
                "height": request.height,
                "prompt": request.prompt
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/logo")
async def generate_logo(request: LogoRequest):
    """Generate a logo using AI"""
    try:
        sd_gen = get_sd_generator()
        image_bytes = sd_gen.generate_logo(
            request.description,
            request.style,
            request.width,
            request.height
        )

        if image_bytes is None:
            raise HTTPException(status_code=500, detail="Logo generation failed")

        if request.format == "binary":
            return Response(content=image_bytes, media_type="image/png")
        else:
            import base64
            b64 = base64.b64encode(image_bytes).decode('utf-8')
            return {
                "image": b64,
                "data_url": f"data:image/png;base64,{b64}",
                "width": request.width,
                "height": request.height,
                "description": request.description,
                "style": request.style
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/illustration")
async def generate_illustration(request: IllustrationRequest):
    """Generate an illustration using AI"""
    try:
        sd_gen = get_sd_generator()
        image_bytes = sd_gen.generate_illustration(
            request.description,
            request.style,
            request.width,
            request.height
        )

        if image_bytes is None:
            raise HTTPException(status_code=500, detail="Illustration generation failed")

        if request.format == "binary":
            return Response(content=image_bytes, media_type="image/png")
        else:
            import base64
            b64 = base64.b64encode(image_bytes).decode('utf-8')
            return {
                "image": b64,
                "data_url": f"data:image/png;base64,{b64}",
                "width": request.width,
                "height": request.height,
                "description": request.description,
                "style": request.style
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
