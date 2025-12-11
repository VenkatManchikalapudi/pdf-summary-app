import React, { useRef } from 'react';

export default function FileUpload({
  selectedFile,
  setSelectedFile,
  handleUpload,
  loading,
  uploadProgress,
  dragActive,
  setDragActive,
  setError
}) {
  const inputRef = useRef();

  function handleFileSelect(file) {
    setSelectedFile(file);
    setError && setError('');
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }

  function handleInputChange(e) {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        border: dragActive ? '2px solid #646cff' : '2px dashed #bbb',
        borderRadius: 16,
        padding: 32,
        marginBottom: 24,
        background: dragActive ? 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)' : 'linear-gradient(135deg, #fafbfc 0%, #e3f6fd 100%)',
        transition: 'background 0.2s, border 0.2s',
        cursor: 'pointer',
        boxShadow: dragActive ? '0 4px 24px #646cff33' : '0 2px 8px #eee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      tabIndex={0}
      onClick={() => inputRef.current.click()}
    >
      {/* Upload Icon SVG */}
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
        <rect width="56" height="56" rx="16" fill="#646cff22"/>
        <path d="M28 38V18M28 18L21 25M28 18L35 25" stroke="#646cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <input
        ref={inputRef}
        id="file-upload-input"
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={handleInputChange}
        disabled={loading}
      />
      {selectedFile ? (
        <div style={{ color: '#222', fontWeight: 500, fontSize: 16 }}>
          <span role="img" aria-label="PDF" style={{ marginRight: 8 }}>📄</span>
          {selectedFile.name}
          <button
            style={{
              marginLeft: 16,
              background: '#ffeded',
              color: '#d32f2f',
              border: 'none',
              borderRadius: 6,
              padding: '4px 12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedFile(null);
            }}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      ) : (
        <div style={{ color: '#646cff', fontWeight: 500, fontSize: 18, letterSpacing: 0.2 }}>
          Drag & drop a PDF here<br />
          <span style={{ color: '#222', fontWeight: 400, fontSize: 15 }}>
            or <span style={{ color: '#646cff', textDecoration: 'underline' }}>browse</span> to select
          </span>
        </div>
      )}
      {uploadProgress > 0 && (
        <div style={{ marginTop: 12, width: '100%' }}>
          <div style={{ height: 10, background: '#e3e3fa', borderRadius: 6, width: '100%' }}>
            <div
              style={{
                width: `${uploadProgress}%`,
                height: 10,
                background: 'linear-gradient(90deg, #646cff 0%, #3f51b5 100%)',
                borderRadius: 6,
                transition: 'width 0.2s',
              }}
            />
          </div>
          <div style={{ fontSize: 13, color: '#646cff', fontWeight: 500, marginTop: 2 }}>{uploadProgress}%</div>
        </div>
      )}
      {selectedFile && (
        <button
          style={{
            marginTop: 18,
            background: 'linear-gradient(90deg, #646cff 0%, #3f51b5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 32px',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 0.5,
            boxShadow: '0 2px 8px #646cff22',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onClick={e => {
            e.stopPropagation();
            handleUpload();
          }}
          disabled={loading}
        >
          Upload
        </button>
      )}
    </div>
  );
}
