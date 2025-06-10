import { useState, useEffect } from 'react';

export default function ReportIssueForm() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCount(prev => prev + 1);
  };

  useEffect(() => {
    if (count === 1) {
      setMessage("✅ Issue reported successfully.");
    } else if (count === 2) {
      setMessage("👍 You've reported two issues.");
    } else if (count > 2) {
      setMessage("👏 Thank you for your active participation!");
    }
  }, [count]);

  return (
    <div className="container">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <label>Service Related To:</label>
        <select required>
          <option value="">--Select--</option>
          <option>Water</option>
          <option>Road</option>
          <option>Electricity</option>
        </select>

        <label>Complaint Level:</label>
        <select required>
          <option value="">--Select--</option>
          <option>Panchayat</option>
          <option>Block</option>
          <option>District</option>
        </select>

        <label>Complaint Type:</label>
        <select required>
          <option value="">--Select--</option>
          <option>Pothole</option>
          <option>Street Light</option>
          <option>Garbage</option>
        </select>

        <label>Complaint Details:</label>
        <textarea rows="4" required></textarea>

        <button type="submit" className="report-btn">Report Issue</button>
      </form>

      <p>{message}</p>

      <style jsx>{`
        .container {
          max-width: 1900px;
          margin: auto;
          padding: 40px;
          background-color: #bfdbfe; /* Light blue background */
          min-height: 100vh;
          color: white; /* White text for container */
        }

        h2 {
          color: white; /* White text for heading */
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
          color: white; /* White text for labels */
        }

        select,
        textarea {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          color: #333; /* Dark text for readability in inputs */
        }

        .report-btn {
          background-color: #1e3a8a; /* Dark blue button */
          color: white; /* White text for button */
          padding: 12px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .report-btn:hover {
          background-color: #1e40af; /* Slightly lighter dark blue on hover */
        }

        p {
          color: black; /* White text for message */
          margin-top: 30px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}