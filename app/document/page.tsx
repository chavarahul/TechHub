'use client'
import React from 'react';

const CapturedPage: React.FC = () => {
  const capturedContent = typeof window !== 'undefined' ? window.localStorage.getItem('capturedContent') : '';

  return (
    <div>
      <h1>Captured Content</h1>
      <div dangerouslySetInnerHTML={{ __html: capturedContent || '' }} />
    </div>
  );
}

export default CapturedPage;