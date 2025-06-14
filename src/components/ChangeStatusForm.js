import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

export default function ChangeStatusForm() {
  const [grievanceId, setGrievanceId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!grievanceId || !status) {
      setMessage('❗ Please enter a grievance ID and select a status.');
      return;
    }

    try {
      const colRef = collection(db, 'issuestatus');
      const q = query(colRef, where('grievanceId', '==', grievanceId));
      const snapshot = await getDocs(q);

      let statusText = status;
      if (status === 'inprogress') statusText = 'In Progress 🚀';
      else if (status === 'complete') statusText = 'Complete ✅';

      if (snapshot.empty) {
        // First-time status (e.g., new)
        await addDoc(colRef, {
          grievanceId,
          status,
          timestamp: new Date(),
        });
        setMessage(`🆕 Grievance ID: ${grievanceId} created with status "${statusText}"`);
      } else {
        // Update existing document
        const docRef = snapshot.docs[0].ref;
        await updateDoc(docRef, {
          status,
          timestamp: new Date(),
        });
        setMessage(`✅ Grievance ID: ${grievanceId} updated to "${statusText}"`);
      }
    } catch (error) {
      console.error('Error updating grievance status:', error);
      setMessage('❌ Failed to update status. Please try again.');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setGrievanceId('');
        setStatus('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container">
      <div className="form-box">
        <h2>🔄 Change Status</h2>
        <form onSubmit={handleSubmit}>
          <label>Grievance ID:</label>
          <input
            type="text"
            value={grievanceId}
            onChange={(e) => setGrievanceId(e.target.value)}
            required
          />

          <label>Status:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="status"
                value="new"
                checked={status === 'new'}
                onChange={(e) => setStatus(e.target.value)}
              />{' '}
              New
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inprogress"
                checked={status === 'inprogress'}
                onChange={(e) => setStatus(e.target.value)}
              />{' '}
              In Progress
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="complete"
                checked={status === 'complete'}
                onChange={(e) => setStatus(e.target.value)}
              />{' '}
              Complete
            </label>
          </div>

          <button type="submit">Submit Status</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background-color: #e0e7ff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .form-box {
          background-color: rgba(75, 85, 99, 0.9);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          color: white;
        }

        h2 {
          margin-bottom: 20px;
          color: white;
          text-align: center;
        }

        label {
          display: block;
          margin-top: 15px;
          font-weight: bold;
          color: white;
        }

        input[type='text'] {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
          color: #333;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .radio-group label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: normal;
        }

        input[type='radio'] {
          accent-color: #4b5563;
        }

        button[type='submit'] {
          width: 100%;
          padding: 12px;
          background-color: #4b5563;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type='submit']:hover {
          background-color: #6b7280;
        }

        .message {
          margin-top: 20px;
          text-align: center;
          font-size: 16px;
          color: white;
        }
      `}</style>
    </div>
  );
}
