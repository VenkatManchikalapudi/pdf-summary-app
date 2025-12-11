import React, { useState, useEffect } from 'react';
import { uploadPDF, getPDFs, summarizePDF, askQuestion } from './api';
import FileUpload from './components/FileUpload';
import PDFList from './components/PDFList';
import SummaryView from './components/SummaryView';
import QASection from './components/QASection';
import StatusBar from './components/StatusBar';

export default function App() {
  // State variables
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // File selection handlers
  function handleFileSelect(file) {
    setSelectedFile(file);
    setError('');
  }
  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
  }
  function handleInputChange(e) {
    if (e.target.files && e.target.files[0]) handleFileSelect(e.target.files[0]);
  }

  // Upload PDF
  async function handleUpload() {
    if (!selectedFile) return;
    setError('');
    setLoading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await new Promise((resolve, reject) => {
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8000/upload');
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = async () => {
          if (xhr.status === 200) {
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);
            setSelectedFile(null);
            const pdfList = await getPDFs();
            setPdfs(pdfList);
            resolve();
          } else reject(new Error('Upload failed'));
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Summarize
  async function handleSummarize() {
    if (!selectedPdf) return;
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const res = await summarizePDF(selectedPdf.id);
      setSummary(res.summary || JSON.stringify(res));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Q&A
  async function handleAsk() {
    if (!selectedPdf || !question) return;
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const res = await askQuestion(selectedPdf.id, question);
      setAnswer(res.answer || JSON.stringify(res));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch PDFs on mount
  useEffect(() => {
    getPDFs().then(setPdfs).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f6f7fb 0%, #f0f2f5 100%)', padding: 0, margin: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ width: '100%', padding: '2.5rem 0 1.5rem 0', background: 'none' }}>
        <h1 style={{ textAlign: 'center', color: '#23272f', fontWeight: 900, fontSize: 40, letterSpacing: 0.5, marginBottom: 0, textShadow: '0 2px 8px #f0f2f5' }}>PDF Summary App</h1>
        <div style={{ textAlign: 'center', color: '#7b8694', fontSize: 18, marginTop: 8, fontWeight: 500, letterSpacing: 0.1 }}>Summarize &amp; ask questions on your PDFs</div>
      </header>
      <main style={{
        maxWidth: 1300,
        margin: '2.5rem auto',
        padding: '2.5rem 2rem',
        background: '#fcfcfe',
        borderRadius: 20,
        boxShadow: '0 8px 32px 0 #e3e6ee',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        border: '1.5px solid #f0f2f5',
      }}>
        <StatusBar error={error} loading={loading} status={null} />
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
            <div className="lds-dual-ring" style={{ width: 36, height: 36 }}></div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          {/* Column 1: Upload & Select */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <FileUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleFileSelect={handleFileSelect}
              handleUpload={handleUpload}
              uploadProgress={uploadProgress}
              loading={loading}
              dragActive={dragActive}
              setDragActive={setDragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleInputChange={handleInputChange}
            />
            <div style={{ marginTop: 32 }}>
              <PDFList
                pdfs={pdfs}
                selectedPdf={selectedPdf}
                setSelectedPdf={pdf => {
                  setSelectedPdf(pdf);
                  setSummary('');
                  setAnswer('');
                }}
              />
              <button
                onClick={handleSummarize}
                disabled={!selectedPdf || loading}
                style={{
                  background: selectedPdf && !loading
                    ? 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #2563eb 100%)'
                    : 'rgba(227,230,238,0.85)',
                  color: selectedPdf && !loading ? '#fff' : '#b0b8c9',
                  border: selectedPdf && !loading ? '1.5px solid #e0e7ff' : '1.5px solid #e3e6ee',
                  borderRadius: 16,
                  padding: '18px 0',
                  fontWeight: 900,
                  fontSize: 22,
                  letterSpacing: 1,
                  boxShadow: selectedPdf && !loading ? '0 8px 32px #3b82f633, 0 1.5px 8px #fff8' : 'none',
                  cursor: selectedPdf && !loading ? 'pointer' : 'not-allowed',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.14s, border 0.18s',
                  marginTop: 22,
                  width: '100%',
                  outline: 'none',
                  borderBottom: selectedPdf && !loading ? '3px solid #2563eb' : '3px solid #e3e6ee',
                  transform: loading ? 'scale(0.97)' : 'scale(1)',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: selectedPdf && !loading ? 'blur(2.5px)' : 'none',
                  WebkitBackdropFilter: selectedPdf && !loading ? 'blur(2.5px)' : 'none',
                  backgroundClip: 'padding-box',
                  boxSizing: 'border-box',
                }}
                onMouseOver={e => {
                  if (selectedPdf && !loading) {
                    e.target.style.background = 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)';
                    e.target.style.transform = 'scale(1.025)';
                  }
                }}
                onMouseOut={e => {
                  if (selectedPdf && !loading) {
                    e.target.style.background = 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #2563eb 100%)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
                onMouseDown={e => {
                  if (selectedPdf && !loading) e.target.style.transform = 'scale(0.97)';
                }}
                onMouseUp={e => {
                  if (selectedPdf && !loading) e.target.style.transform = 'scale(1.025)';
                }}
              >
                {loading ? (
                  <span className="lds-dual-ring" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(0.7)' }} />
                ) : (
                  <span style={{
                    letterSpacing: 1.5,
                    fontSize: 22,
                    fontWeight: 900,
                    color: selectedPdf && !loading ? '#fff' : '#b0b8c9',
                    textShadow: 'none',
                    filter: 'none',
                  }}>Summarize</span>
                )}
              </button>
              {pdfs.length === 0 && (
                <div style={{ color: '#b0b8c9', textAlign: 'center', margin: '1.5rem 0', fontWeight: 500 }}>
                  No PDFs uploaded yet. Upload a PDF to get started!
                </div>
              )}
            </div>
          </div>
          {/* Column 2: Summary */}
          <div style={{ flex: 1, minWidth: 320, borderLeft: '1.5px solid #e3e6ee', paddingLeft: 40 }}>
            <SummaryView summary={summary} />
            {!summary && selectedPdf && (
              <div style={{ color: '#b0b8c9', textAlign: 'center', margin: '1.5rem 0', fontWeight: 500 }}>
                No summary yet. Click Summarize to generate one.
              </div>
            )}
          </div>
          {/* Column 3: Q&A */}
          <div style={{ flex: 1, minWidth: 320, borderLeft: '1.5px solid #e3e6ee', paddingLeft: 40 }}>
            <QASection
              question={question}
              setQuestion={setQuestion}
              answer={answer}
              handleAsk={handleAsk}
              selectedPdf={selectedPdf}
              loading={loading}
            />
          </div>
        </div>
      </main>
      <footer style={{ textAlign: 'center', color: '#b0b8c9', fontSize: 15, margin: '2.5rem 0 1.5rem 0', fontWeight: 500 }}>
        &copy; {new Date().getFullYear()} PDF Summary App &mdash; Built with FastAPI &amp; React
      </footer>
      {/* Spinner CSS */}
      <style>{`
        .lds-dual-ring {
          display: inline-block;
          width: 36px;
          height: 36px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 28px;
          height: 28px;
          margin: 4px;
          border-radius: 50%;
          border: 4px solid #b0b8c9;
          border-color: #b0b8c9 transparent #4f8cff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}