import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig'; // adjust path if needed
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function WithdrawIssueForm() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    issueId: '',
    complaintDate: '',
    resolvedDate: ''
  });

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'issueswithdrawed'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setCount(prev => prev + 1);
      setFormData({ issueId: '', complaintDate: '', resolvedDate: '' });
    } catch (error) {
      console.error('Error withdrawing issue: ', error);
      setMessage('❌ Failed to withdraw. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (count === 1) {
      setMessage("🗑️ Issue withdrawn.");
    } else if (count === 2) {
      setMessage("✅ Two issues withdrawn.");
    } else if (count > 2) {
      setMessage("📉 Frequent withdrawals logged.");
    }
  }, [count]);

  return (
    <div className="container">
      <h2>Withdraw Issue</h2>
      <form onSubmit={handleWithdraw}>
        <label>Enter Issue ID:</label>
        <input type="text" name="issueId" value={formData.issueId} onChange={handleChange} required />

        <label>Date of Complaint:</label>
        <input type="date" name="complaintDate" value={formData.complaintDate} onChange={handleChange} required />

        <label>Date Issue Was Resolved:</label>
        <input type="date" name="resolvedDate" value={formData.resolvedDate} onChange={handleChange} required />

        <button type="submit" className="withdraw-btn">Withdraw Issue</button>
      </form>

      <p>{message}</p>

      <style jsx>{`
        .container {
          max-width: 1900px;
          margin: auto;
          padding: 40px;
          background-color: #ffe4e6; /* Light pink background */
          min-height: 100vh;
          color: black; /* White text for container */
        }

        h2 {
          color: black;
          margin-bottom: 20px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        label {
          font-weight: bold;
          color: black;
        }

        input[type="text"],
        input[type="date"] {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          color: #333;
        }

        .withdraw-btn {
          background-color: rgb(217, 101, 115);
          color: white;
          padding: 12px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .withdraw-btn:hover {
          background-color: rgb(230, 18, 75);
        }

        p {
          color: black;
          margin-top: 30px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
