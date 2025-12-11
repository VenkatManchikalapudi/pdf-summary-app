import React from 'react';

export default function SummaryView({ summary }) {
  if (!summary) return null;
  return (
    <div
      style={{
        margin: '1.5rem 0',
        background: 'linear-gradient(135deg, #f6f6ff 0%, #e3f6fd 100%)',
        padding: '1.5rem',
        borderRadius: 12,
        boxShadow: '0 1px 4px #e3e3fa',
      }}
    >
      <strong style={{ color: '#3f51b5', fontSize: 18 }}>Summary:</strong>
      <div style={{ marginTop: 8, color: '#222', fontSize: 16 }}>{summary}</div>
    </div>
  );
}
