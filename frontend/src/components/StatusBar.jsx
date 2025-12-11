import React from 'react';

export default function StatusBar({ error, loading, status }) {
  if (error) {
    return (
      <div style={{
        background: '#ffeaea',
        color: '#d32f2f',
        padding: '10px 18px',
        borderRadius: 8,
        margin: '1rem 0',
        fontWeight: 500,
        boxShadow: '0 1px 4px #f8d7da',
      }}>
        <span role="img" aria-label="error" style={{ marginRight: 8 }}>❌</span>
        {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div style={{
        background: '#e3eaff',
        color: '#3f51b5',
        padding: '10px 18px',
        borderRadius: 8,
        margin: '1rem 0',
        fontWeight: 500,
        boxShadow: '0 1px 4px #e3eaff',
      }}>
        <span role="img" aria-label="loading" style={{ marginRight: 8 }}>⏳</span>
        {status || 'Processing...'}
      </div>
    );
  }
  if (status) {
    return (
      <div style={{
        background: '#eaffea',
        color: '#388e3c',
        padding: '10px 18px',
        borderRadius: 8,
        margin: '1rem 0',
        fontWeight: 500,
        boxShadow: '0 1px 4px #eaffea',
      }}>
        <span role="img" aria-label="info" style={{ marginRight: 8 }}>ℹ️</span>
        {status}
      </div>
    );
  }
  return null;
}
