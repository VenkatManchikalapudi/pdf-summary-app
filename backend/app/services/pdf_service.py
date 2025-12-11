# PDF text extraction and summarization utilities
import PyPDF2
import os

def extract_text_from_pdf(filepath):
	"""Extract all text from a PDF file using PyPDF2."""
	if not os.path.exists(filepath):
		raise FileNotFoundError(f"PDF file not found: {filepath}")
	text = ""
	with open(filepath, "rb") as f:
		reader = PyPDF2.PdfReader(f)
		for page in reader.pages:
			text += page.extract_text() or ""
	return text

