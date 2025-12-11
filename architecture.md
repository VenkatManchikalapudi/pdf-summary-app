# PDF Summary App Architecture

## Overview
The PDF Summary App is a full-stack application that allows users to upload PDF files, generate summaries, and perform Q&A on the content using AI models. The project is organized into two main parts:

- **Backend**: FastAPI, Python, Ollama AI, FAISS, SQLite
- **Frontend**: React (to be scaffolded)

## Directory Structure
```
PDF Summary App/
├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── config.py
│   ├── db.py
│   └── main.py
├── static/
├── tests/
├── uploads/
├── utils/
├── requirements.txt
├── main.py
├── README.md
└── architecture.md
```

## Backend Architecture
- **FastAPI**: REST API for PDF upload, summary, and Q&A endpoints
- **PyPDF2**: Extracts text from PDF files
- **FAISS**: Stores and searches text embeddings for semantic Q&A
- **Sentence Transformers**: Generates embeddings for text chunks
- **Ollama**: AI model for summarization and Q&A
- **SQLite + SQLAlchemy**: Stores PDF metadata and chunk info
- **Tests**: Pytest for unit and integration tests

## Frontend Architecture (Planned)
- **React**: User interface for uploading PDFs, viewing summaries, and asking questions
- **API Layer**: Communicates with FastAPI backend
- **Components**: Modular UI (Upload, Summary, Q&A, History, etc.)

## Data Flow
1. User uploads PDF via frontend
2. Backend extracts text, chunks it, generates embeddings, stores in DB/FAISS
3. User requests summary or asks a question
4. Backend uses Ollama to generate summary/answer, returns to frontend

## Security & Deployment
- JWT/OAuth (planned)
- Docker support (planned)
- Can be deployed locally or to the cloud

---
This document provides a high-level overview. See `README.md` in each subfolder for details.
