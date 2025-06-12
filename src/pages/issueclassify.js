import { useState } from 'react';

export default function ReportIssuePage() {
  const [reportText, setReportText] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function classifyReport() {
    if (!reportText.trim()) {
      alert('Please describe the issue before submitting.');
      return;
    }

    setLoading(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportText }),
      });

      const data = await res.json();
      if (data.category) {
        setAiResult(data);
      } else {
        setAiResult({ error: data.error || 'AI failed to classify the issue.' });
      }
    } catch (error) {
      setAiResult({ error: 'Server error occurred while classifying.' });
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#d9fdd3', // light green background
      color: '#1a4314', // dark green text
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 100, 0, 0.1)',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      marginBottom: '20px',
      borderRadius: '6px',
      border: '1px solid #6aa84f',
      backgroundColor: '#f0fff0',
      color: '#1a4314',
    },
    button: {
      padding: '12px 24px',
      backgroundColor: loading ? '#888' : '#1a4314', // dark green
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: loading ? 'not-allowed' : 'pointer',
      marginBottom: '15px',
    },
    resultBox: {
      marginTop: '30px',
      background: '#e6ffe6',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #6aa84f',
    },
    errorText: {
      color: 'red',
    },
    infoList: {
      listStyle: 'none',
      paddingLeft: 0,
      lineHeight: '1.6',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#1a4314',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Report an Urban Issue</h1>

      <textarea
        rows="6"
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        placeholder="Describe your issue clearly, e.g., 'There's a broken manhole near Gandhi street leaking water.'"
        style={styles.textarea}
      />

      <button
        onClick={classifyReport}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Classifying...' : 'Classify Issue'}
      </button>

      {aiResult && (
        <div style={styles.resultBox}>
          <h2>🔍 AI Classification Result:</h2>
          {aiResult.error ? (
            <p style={styles.errorText}>{aiResult.error}</p>
          ) : (
            <ul style={styles.infoList}>
              <li><strong>Category:</strong> {aiResult.category}</li>
              <li><strong>Urgency:</strong> {aiResult.urgency}</li>
              <li><strong>Department:</strong> {aiResult.department}</li>
            </ul>
          )}
        </div>
      )}

      
    </div>
  );
}
