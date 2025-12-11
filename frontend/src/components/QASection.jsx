import React from 'react';

export default function QASection({
  question,
  setQuestion,
  answer,
  handleAsk,
  selectedPdf,
  loading
}) {
  return (
    <div style={{ margin: '1.5rem 0', padding: 20, background: '#f8faff', borderRadius: 12, boxShadow: '0 1px 4px #e3e3fa' }}>
      <input
        type="text"
        placeholder="Ask a question about the PDF..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: '70%', marginRight: 8, padding: 8, borderRadius: 6, border: '1px solid #bbb', fontSize: 15 }}
        disabled={!selectedPdf || loading}
      />
      <button
        onClick={handleAsk}
        disabled={!selectedPdf || !question || loading}
        style={{
          background: 'linear-gradient(90deg, #646cff 0%, #3f51b5 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: 0.5,
          boxShadow: '0 2px 8px #646cff22',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        Ask
      </button>
      {answer && (
        <div
          style={{
            marginTop: 18,
            background: '#f6f6f6',
            padding: '1rem',
            borderRadius: 8,
            color: '#222',
            fontSize: 16,
          }}
        >
          <strong style={{ color: '#3f51b5' }}>Answer:</strong>
          <div style={{ marginTop: 6 }}>{answer}</div>
        </div>
      )}
    </div>
  );
}
