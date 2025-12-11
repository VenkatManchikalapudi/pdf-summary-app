# PDF Summary App – Backend

This is the backend implementation for the PDF Summary App. It provides RESTful APIs for uploading PDF files, generating summaries, and performing Q&A on PDF content using AI models.

## Features
- Upload PDF files and extract text
- Chunk and embed PDF content for semantic search
- Generate summaries using Ollama AI models
- Perform Q&A on PDF content
- Store PDF metadata and chunks in SQLite database
- FastAPI-based, modular, and production-ready
- Unit and integration tests with pytest

## Tech Stack
- **FastAPI** – API framework
- **PyPDF2** – PDF text extraction
- **FAISS** – Vector search for semantic Q&A
- **Sentence Transformers** – Text embeddings
- **Ollama** – AI model for summary and Q&A
- **SQLAlchemy + SQLite** – Database
- **pytest** – Testing

## Project Structure
```
backend/
├── app/
│   ├── api/           # API route definitions
│   ├── models/        # Pydantic schemas
│   ├── services/      # Business logic (Ollama, PDF, etc.)
│   ├── utils/         # Utility functions (chunking, FAISS, etc.)
│   ├── config.py      # Configuration
│   ├── db.py          # Database models and setup
│   └── main.py        # FastAPI app entrypoint
├── static/            # (Optional) Static files
├── tests/             # Unit and integration tests
├── uploads/           # Uploaded PDF files
├── utils/             # Shared utilities
├── requirements.txt   # Python dependencies
├── main.py            # Entrypoint (imports app/main.py)
├── pdf_app.db         # SQLite database file
└── README.md          # This file
```

## Setup & Usage
1. **Install dependencies**
	```sh
	cd backend
	pip install -r requirements.txt
	```
2. **Start Ollama** (ensure the model is running, e.g., llama2)
3. **Run the API server**
	```sh
	uvicorn main:app --reload
	```
4. **API Docs**: Visit [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints
- `POST /upload` – Upload a PDF file
- `GET /pdfs` – List all uploaded PDFs
- `GET /pdf/{pdf_id}` – Get PDF metadata and chunks
- `DELETE /pdf/{pdf_id}` – Delete a PDF and its chunks
- `POST /summarize` – Generate a summary for a PDF
- `POST /qa` – Ask a question about a PDF

## Testing
Run all tests with:
```sh
pytest
```

## Environment Variables
See `app/config.py` for configuration options (database path, chunk size, etc.).

## Notes
- Ollama must be running locally for summary and Q&A endpoints.
- For production, consider Dockerizing and adding authentication (JWT/OAuth).

---
For architecture and full-stack details, see the root `architecture.md`.
