import { useState, useRef } from 'react';

export default function AskAI() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [showThemeBox, setShowThemeBox] = useState(false);

  const chatRef = useRef(null);

  const questionTranslations = {
    en: [
      "How to report a civic issue?",
      "Who can view my complaint?",
      "How long will it take to resolve an issue?",
      "How to upload an image?",
      "Can I withdraw my complaint?",
      "What if my area is not listed?"
    ],
    ta: [
      "ஒரு பிரச்சனையை எப்படி புகாரளிப்பது?",
      "என் புகாரைப் பார்ப்பது யார்?",
      "ஒரு பிரச்சனை தீர்விற்கு எவ்வளவு நேரம் எடுக்கும்?",
      "படத்தை எப்படி பதிவேற்றுவது?",
      "நான் புகாரை திரும்பப் பெற முடியுமா?",
      "என் பகுதி பட்டியலில் இல்லையெனில் என்ன செய்வது?"
    ]
  };

  const inbuiltAnswers = {
    en: {
      "How to report a civic issue?": "To report an issue, go to the Citizen tab > Click 'Report Issue' > Fill the form with details and location > Submit.",
      "Who can view my complaint?": "Only authorized government officials and admins can view your complaint.",
      "How long will it take to resolve an issue?": "Resolution time varies based on issue type and area.",
      "How to upload an image?": "While submitting the complaint form, you’ll see an option to upload images.",
      "Can I withdraw my complaint?": "Yes, go to the Citizen tab > 'Withdraw Issue' > Enter ID and confirm.",
      "What if my area is not listed?": "Type your area manually and pin it on the map."
    },
    ta: {
      "ஒரு பிரச்சனையை எப்படி புகாரளிப்பது?": "ஒரு பிரச்சனையை புகாரளிக்க, குடிமகன் பகுதி > 'புகார் பதிவு' கிளிக் செய்யவும் > விவரங்களைச் சேர்க்கவும்.",
      "என் புகாரைப் பார்ப்பது யார்?": "அதிகார பெற்ற அரசு அதிகாரிகள் மற்றும் நிர்வாகிகள் மட்டுமே பார்வையிடலாம்.",
      "ஒரு பிரச்சனை தீர்விற்கு எவ்வளவு நேரம் எடுக்கும்?": "பிரச்சனை வகை மற்றும் பகுதியை பொறுத்து நேரம் மாறும்.",
      "படத்தை எப்படி பதிவேற்றுவது?": "புகார் படிவத்தில் படங்களை பதிவேற்றும் விருப்பம் காணப்படும்.",
      "நான் புகாரை திரும்பப் பெற முடியுமா?": "ஆம், குடிமகன் பகுதி > 'புகார் திரும்ப பெற' > ID உள்ளிடவும்.",
      "என் பகுதி பட்டியலில் இல்லையெனில் என்ன செய்வது?": "பகுதியை கைமுறையாக உள்ளிட்டு, வரைபடத்தில் குறிப்பிடவும்."
    }
  };

  const ask = async () => {
    if (selectedQuestion && !customQuestion.trim()) {
      const answer = inbuiltAnswers[language][selectedQuestion] || 'No answer available.';
      setResponse(answer);
      setHistory([...history, { q: selectedQuestion, a: answer }]);
    } else if (customQuestion.trim()) {
      const res = await fetch('/api/chatai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customQuestion })
      });
      const data = await res.json();
      setResponse(data.response);
      setHistory([...history, { q: customQuestion, a: data.response }]);
    } else {
      setResponse('Please select or type a question first.');
    }
  };

  const startNewChat = () => {
    setSelectedQuestion('');
    setCustomQuestion('');
    setResponse('');
    setShowHistory(false);
  };

  const toggleTheme = (mode) => {
    setTheme(mode);
    setShowThemeBox(false);
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setSelectedQuestion('');
    setCustomQuestion('');
    setResponse('');
  };

  const handlePrint = () => {
    const printContent = chatRef.current;
    const win = window.open('', '', 'width=900,height=650');
    win.document.write(`<html><head><title>Chat History</title></head><body>${printContent.innerHTML}</body></html>`);
    win.document.close();
    win.print();
  };

  const handleDownloadPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      const chatText = history.map((item) => `Q: ${item.q}\nA: ${item.a}\n\n`).join('');
      doc.text(chatText || 'No history available.', 10, 10);
      doc.save('chat-history.pdf');
    });
  };

  const isDark = theme === 'dark';

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: isDark ? '#000' : '#f3e8ff', color: isDark ? '#fff' : '#4b0082', minHeight: '100vh', padding: '20px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
        <div style={{ fontSize: '2rem', backgroundColor: '#4b0082', color: '#fff', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setShowHistory(!showHistory)}>&#9776;</div>

        {showHistory && (
          <div style={{ backgroundColor: '#4b0082', marginTop: '10px', borderRadius: '8px', padding: '10px' }}>
            <button onClick={() => setShowHistory(true)} style={btnStyle}>Recent History</button>
            <button onClick={startNewChat} style={btnStyle}>New Chat</button>
            <button onClick={() => setShowThemeBox(!showThemeBox)} style={btnStyle}>Theme</button>
            <div style={{ marginTop: '10px', color: '#fff' }}>தமிழ் | English</div>
            <button onClick={() => toggleLanguage('ta')} style={btnStyle}>தமிழ்</button>
            <button onClick={() => toggleLanguage('en')} style={btnStyle}>English</button>
          </div>
        )}

        {showThemeBox && (
          <div style={{ backgroundColor: '#fff', padding: '10px', marginTop: '10px', borderRadius: '6px' }}>
            <button onClick={() => toggleTheme('light')} style={btnStyle}>☀️ Light</button>
            <button onClick={() => toggleTheme('dark')} style={btnStyle}>🌙 Dark</button>
          </div>
        )}
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '2rem', color: isDark ? '#fff' : '#4b0082' }}>FixMyStreetAI – Virtual Assistant</h1>

      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: isDark ? '#222' : '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 0 10px rgba(75, 0, 130, 0.2)' }}>
        <select value={selectedQuestion} onChange={(e) => { setSelectedQuestion(e.target.value); setCustomQuestion(''); }} style={inputStyle}>
          <option value="">-- {language === 'en' ? 'Select a Question' : 'ஒரு கேள்வியை தேர்வு செய்யவும்'} --</option>
          {questionTranslations[language].map((q, i) => (<option key={i} value={q}>{q}</option>))}
        </select>

        <textarea placeholder={language === 'en' ? "Or ask your own question..." : "அல்லது உங்கள் கேள்வியை எழுங்கள்..."} value={customQuestion} onChange={(e) => { setCustomQuestion(e.target.value); setSelectedQuestion(''); }} style={inputStyle} />

        <button onClick={ask} style={askBtnStyle}>ASK</button>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={handlePrint} style={askBtnStyle}>🖨️ {language === 'en' ? 'Print Chat' : 'அச்சிட'}</button>
          <button onClick={handleDownloadPDF} style={askBtnStyle}>📄 {language === 'en' ? 'Download PDF' : 'PDF பதிவிறக்குக'}</button>
        </div>

        <div ref={chatRef}>
          {response && (
            <div style={responseStyle}>
              <h3>{language === 'en' ? 'Answer:' : 'பதில்:'}</h3>
              <p>{response}</p>
            </div>
          )}

          {showHistory && history.length > 0 && (
            <div style={historyStyle}>
              <h3>🕘 {language === 'en' ? 'Recent History' : 'சமீபத்திய வரலாறு'}:</h3>
              <ul>
                {history.map((item, idx) => (
                  <li key={idx}><strong>Q:</strong> {item.q} <br /><strong>A:</strong> {item.a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #4b0082',
  borderRadius: '6px',
  marginBottom: '15px',
  fontSize: '1rem',
};

const askBtnStyle = {
  backgroundColor: '#4b0082',
  color: '#f3e8ff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const responseStyle = {
  backgroundColor: '#f9f9ff',
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '6px',
};

const historyStyle = {
  marginTop: '30px',
  padding: '15px',
  border: '1px solid #ccc',
  backgroundColor: '#faf5ff',
  borderRadius: '6px',
};

const btnStyle = {
  display: 'block',
  backgroundColor: '#e0bbff',
  color: '#4b0082',
  padding: '8px 15px',
  border: 'none',
  marginBottom: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '150px',
  textAlign: 'left',
};
