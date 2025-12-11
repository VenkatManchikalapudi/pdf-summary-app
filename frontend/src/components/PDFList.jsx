import React from 'react';

export default function PDFList({ pdfs, selectedPdf, setSelectedPdf, setSummary, setAnswer, loading }) {
  return (
    <div style={{ margin: '1.5rem 0', padding: 20, background: '#f8faff', borderRadius: 12, boxShadow: '0 1px 4px #e3e3fa' }}>
      <label htmlFor="pdf-select" style={{ fontWeight: 600, fontSize: 16, color: '#3f51b5' }}>Select PDF:</label>
      <select
        id="pdf-select"
        value={selectedPdf?.id || ''}
        onChange={e => {
          const pdf = pdfs.find(p => p.id === Number(e.target.value));
          setSelectedPdf(pdf);
          setSummary('');
          setAnswer('');
        }}
        style={{ marginLeft: 12, padding: 6, borderRadius: 6, border: '1px solid #bbb', fontSize: 15 }}
        disabled={loading || pdfs.length === 0}
      >
        <option value="">-- Choose --</option>
        {pdfs.map(pdf => (
          <option key={pdf.id} value={pdf.id}>{pdf.filename}</option>
        ))}
      </select>
    </div>
  );
}
