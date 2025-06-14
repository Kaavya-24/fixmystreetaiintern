import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ReportIssueForm() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    district: '',
    service: '',
    level: '',
    type: '',
    details: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'issuesreported'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setCount(prev => prev + 1);
      setFormData({
        name: '',
        contact: '',
        address: '',
        district: '',
        service: '',
        level: '',
        type: '',
        details: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('❌ Failed to report issue. Try again.');
    }
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
      <h2>📝 Report an Issue</h2>
      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Contact Number:</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Enter a 10-digit number"
          required
        />

        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          required
        ></textarea>

        <label>District:</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">--Select District--</option>
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Tirunelveli">Tirunelveli</option>
          <option value="Salem">Salem</option>
          <option value="Trichy">Trichy</option>
          <option value="Erode">Erode</option>
          <option value="Vellore">Vellore</option>
          <option value="Kanchipuram">Kanchipuram</option>
          <option value="Thanjavur">Thanjavur</option>
        </select>

        <label>Service Related To:</label>
        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option>Water</option>
          <option>Road</option>
          <option>Electricity</option>
        </select>

        <label>Complaint Level:</label>
        <select name="level" value={formData.level} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option>Panchayat</option>
          <option>Block</option>
          <option>District</option>
        </select>

        <label>Complaint Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option>Pothole</option>
          <option>Street Light</option>
          <option>Garbage</option>
        </select>

        <label>Complaint Details:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <button type="submit" className="report-btn">Report Issue</button>
      </form>

      <p>{message}</p>

      <style jsx>{`
        .container {
          max-width: 1900px;
          margin: auto;
          padding: 40px;
          background-color: #bfdbfe;
          min-height: 100vh;
          color: white;
        }

        h2 {
          color: white;
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
          color: white;
        }

        input, select, textarea {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          color: #333;
        }

        .report-btn {
          background-color: #1e3a8a;
          color: white;
          padding: 12px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .report-btn:hover {
          background-color: #1e40af;
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
