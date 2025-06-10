import { useState, useEffect } from 'react';

export default function WithdrawIssueForm() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    setCount(prev => prev + 1);
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
        <input type="text" required />

        <label>Date of Complaint:</label>
        <input type="date" required />

        <label>Date Issue Was Resolved:</label>
        <input type="date" required />

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
          color:black; /* White text for container */
        }

        h2 {
          color: black; /* White text for heading */
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
          color: black; /* White text for labels */
        }

        input[type="text"],
        input[type="date"] {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          color: #333; /* Dark text for readability in inputs */
        }

        .withdraw-btn {
          background-color: rgb(217, 101, 115); /* Button color */
          color: white; /* White text for button */
          padding: 12px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .withdraw-btn:hover {
          background-color: rgb(230, 18, 75); /* Hover color */
        }

        p {
          color: black; /* Black text for message */
          margin-top: 30px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}