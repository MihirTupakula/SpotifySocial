import React from 'react';

const TestPage = () => {
  console.log('TestPage rendering...');
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>If you can see this, the app is working!</p>
      <p>Check the browser console for debug logs.</p>
    </div>
  );
};

export default TestPage;
