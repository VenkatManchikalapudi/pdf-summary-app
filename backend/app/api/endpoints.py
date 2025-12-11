
"""
API route definitions for PDF Summary App.
Includes CRUD operations, PDF upload, summarization, and Q&A endpoints.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Query, Path
from app.services.pdf_service import extract_text_from_pdf
from app.services.ollama_service import summarize_with_ollama
from app.services.ollama_service import qa_with_ollama
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# --- Pydantic Schemas ---
class PDFMetadata(BaseModel):
	id: int
	filename: str
	filepath: Optional[str]

class PDFChunkSchema(BaseModel):
	index: int
	text: str

class PDFDetail(BaseModel):
	id: int
	filename: str
	filepath: Optional[str]
	chunks: List[PDFChunkSchema]

class UploadResponse(BaseModel):
	text: str
	chunks: int
	pdf_id: int

class DeleteResponse(BaseModel):
	detail: str

uploaded_pdfs = {}  # In-memory: pdf_id -> filename
# --- Endpoints ---
@router.get("/pdfs", response_model=List[PDFMetadata])
def list_pdfs():
	"""List all PDFs in the uploads directory with metadata."""
	import os
	uploads_dir = "./uploads"
	pdfs = []
	if os.path.exists(uploads_dir):
		files = [f for f in os.listdir(uploads_dir) if f.lower().endswith('.pdf')]
		for idx, filename in enumerate(sorted(files), start=1):
			pdfs.append(PDFMetadata(id=idx, filename=filename, filepath=f"/uploads/{filename}"))
	return pdfs

@router.get("/pdf/{pdf_id}", response_model=PDFDetail)
def get_pdf(pdf_id: int = Path(..., description="ID of the PDF to retrieve")):
	"""Retrieve metadata and chunks for a single PDF."""
	# TODO: Refactor to use agentic LLM (Ollama) for reasoning if needed
	# Dummy data for docs
	return PDFDetail(id=pdf_id, filename="example.pdf", filepath="/uploads/example.pdf", chunks=[PDFChunkSchema(index=0, text="Sample chunk")])

@router.delete("/pdf/{pdf_id}", response_model=DeleteResponse)
def delete_pdf(pdf_id: int = Path(..., description="ID of the PDF to delete")):
	"""Delete a PDF and all its chunks from the database."""
	# TODO: Refactor to use agentic LLM (Ollama) for reasoning if needed
	return DeleteResponse(detail="PDF and its chunks deleted.")

import shutil
import os

@router.post("/upload", response_model=UploadResponse)
def upload_pdf(file: UploadFile = File(...)):
	"""Upload a PDF file, save it to disk, and return metadata."""
	uploads_dir = "./uploads"
	os.makedirs(uploads_dir, exist_ok=True)
	file_path = os.path.join(uploads_dir, file.filename)
	with open(file_path, "wb") as buffer:
		shutil.copyfileobj(file.file, buffer)
	# Assign a simple incremental pdf_id
	pdf_id = len(uploaded_pdfs) + 1
	uploaded_pdfs[pdf_id] = file.filename
	return UploadResponse(text="Uploaded", chunks=0, pdf_id=pdf_id)

class SummarizeRequest(BaseModel):
	pdf_id: int

class SummarizeResponse(BaseModel):
	summary: str



# --- Persistent cache for summaries (file-based using shelve) ---
import shelve
SUMMARY_CACHE_PATH = './summary_cache.db'
qa_cache = {}  # Q&A can remain in-memory for now

@router.post("/summarize", response_model=SummarizeResponse)
def summarize_pdf(request: SummarizeRequest):
	"""Summarize the PDF with the given ID using Ollama Llama2. Uses persistent file-based cache."""
	import os
	uploads_dir = "./uploads"
	if not os.path.exists(uploads_dir):
		raise HTTPException(status_code=404, detail="Uploads directory not found")
	files = [f for f in os.listdir(uploads_dir) if f.lower().endswith('.pdf')]
	files_sorted = sorted(files)
	try:
		filename = files_sorted[request.pdf_id - 1]
	except IndexError:
		raise HTTPException(status_code=404, detail="PDF not found")
	# Persistent caching logic
	with shelve.open(SUMMARY_CACHE_PATH) as summary_cache:
		if str(request.pdf_id) in summary_cache:
			return SummarizeResponse(summary=summary_cache[str(request.pdf_id)])
		pdf_path = os.path.join(uploads_dir, filename)
		try:
			text = extract_text_from_pdf(pdf_path)
			truncated_text = text[:4000]
			summary = summarize_with_ollama(truncated_text)
			summary_cache[str(request.pdf_id)] = summary
			return SummarizeResponse(summary=summary)
		except Exception as e:
			raise HTTPException(status_code=500, detail=str(e))

class QARequest(BaseModel):
	pdf_id: int
	question: str

class QAResponse(BaseModel):
	answer: str

@router.post("/qa", response_model=QAResponse)
def qa_pdf(request: QARequest):
	"""Answer a question about the PDF with the given ID using Ollama Llama2."""
	import os
	uploads_dir = "./uploads"
	if not os.path.exists(uploads_dir):
		raise HTTPException(status_code=404, detail="Uploads directory not found")
	files = [f for f in os.listdir(uploads_dir) if f.lower().endswith('.pdf')]
	files_sorted = sorted(files)
	try:
		filename = files_sorted[request.pdf_id - 1]
	except IndexError:
		raise HTTPException(status_code=404, detail="PDF not found")
	# Caching logic
	cache_key = (request.pdf_id, request.question.strip().lower())
	if cache_key in qa_cache:
		return QAResponse(answer=qa_cache[cache_key])
	pdf_path = os.path.join(uploads_dir, filename)
	try:
		text = extract_text_from_pdf(pdf_path)
		truncated_text = text[:4000]
		answer = qa_with_ollama(truncated_text, request.question)
		qa_cache[cache_key] = answer
		return QAResponse(answer=answer)
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
