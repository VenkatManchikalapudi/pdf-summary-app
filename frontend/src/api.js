
// src/api.js
// Utility functions for communicating with the backend API

const API_BASE = 'http://localhost:8000';

/**
 * Upload a PDF file to the backend.
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} - Response from backend
 */
export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

/**
 * Fetch the list of uploaded PDFs from the backend.
 * @returns {Promise<Array>} - List of PDF metadata
 */
export async function getPDFs() {
  const res = await fetch(`${API_BASE}/pdfs`);
  if (!res.ok) throw new Error('Failed to fetch PDFs');
  return res.json();
}

/**
 * Request a summary for a specific PDF.
 * @param {number} pdfId - The ID of the PDF
 * @returns {Promise<Object>} - Summary response
 */
export async function summarizePDF(pdfId) {
  const res = await fetch(`${API_BASE}/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdf_id: pdfId }),
  });
  if (!res.ok) throw new Error('Failed to summarize');
  return res.json();
}

/**
 * Ask a question about a specific PDF.
 * @param {number} pdfId - The ID of the PDF
 * @param {string} question - The user's question
 * @returns {Promise<Object>} - Answer response
 */
export async function askQuestion(pdfId, question) {
  const res = await fetch(`${API_BASE}/qa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdf_id: pdfId, question }),
  });
  if (!res.ok) throw new Error('Failed to get answer');
  return res.json();
}
