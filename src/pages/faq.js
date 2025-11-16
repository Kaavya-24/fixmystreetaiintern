import { useState } from "react";
import { useRouter } from "next/router";

export default function Faq() {
  const [helpClicked, setHelpClicked] = useState(false);
  const router = useRouter();

  const toggleHelpButton = () => {
    setHelpClicked(!helpClicked);
  };

  const handleGoToAssistant = () => {
    router.push("/chatai");
  };

  return (
    <>
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq" className="active">❓ FAQ & Help</a>
      </nav>

      <div className="container">
        <section className="tutorial">
          <h1>📌 Step-by-Step Guide for First-Time Users</h1>
          <ol>
            <li>Register or log in to your citizen account.</li>
            <li>Navigate to the "Report Issue" section.</li>
            <li>Fill in the issue description, location.</li>
            <li>Submit the complaint and note your Complaint ID.</li>
            <li>Track the status of your complaint under "Track Complaint".</li>
          </ol>
        </section>

        <section className="video-section">
          <video width="600" controls>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="usage">
          <h2>📊 App Usage Level</h2>
          <progress value="85" max="100"></progress>
          <p>Citizens across 85% of wards actively use this platform.</p>
          <table>
            <thead>
              <tr><th>Year</th><th>Complaints Solved (%)</th></tr>
            </thead>
            <tbody>
              <tr><td>2019</td><td>72%</td></tr>
              <tr><td>2020</td><td>78%</td></tr>
              <tr><td>2021</td><td>83%</td></tr>
              <tr><td>2022</td><td>87%</td></tr>
              <tr><td>2023</td><td>90%</td></tr>
            </tbody>
          </table>
        </section>

        {/* ✅ AI Assistant Help Box */}
        <section className="ai-help-box">
          <h2>🆘 Need Help or Ask Questions</h2>
          <p>Use our AI Assistant to clear your doubts 🤖🧠💬</p>
          <button onClick={handleGoToAssistant}>🤔 Go to AI Assistant</button>
        </section>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f3e8ff !important;
          color: #333;
          animation: blurToClear 1s ease forwards;
          filter: blur(8px);
        }

        @keyframes blurToClear {
          to { filter: blur(0); }
        }

        nav {
          background-color: #ae58eb;
          padding: 15px;
          display: flex;
          justify-content: center;
          gap: 25px;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        nav a:hover,
        nav .active {
          background-color: white;
          color: #ae58eb;
        }

        .container {
          max-width: 900px;
          margin: auto;
          padding: 40px 20px;
        }

        .tutorial h1,
        .video-section h2,
        .usage h2,
        .ai-help-box h2 {
          color: #6a1a9c;
          margin-bottom: 10px;
        }

        .tutorial ol {
          padding-left: 20px;
          margin-bottom: 40px;
          color: white;
        }

        .video-section video {
          margin-top: 10px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(14, 14, 14, 0.2);
        }

        .usage progress {
          width: 100%;
          height: 25px;
          appearance: none;
          margin-bottom: 10px;
        }

        progress::-webkit-progress-bar {
          background-color: #eee;
          border-radius: 20px;
        }

        progress::-webkit-progress-value {
          background-color: #ae58eb;
          border-radius: 20px;
        }

        .usage table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          font-size: 16px;
        }

        .usage th, .usage td {
          border: 1px solid #ae58eb;
          padding: 12px 15px;
          text-align: center;
        }

        .usage th {
          background-color: #ae58eb;
          color: white;
          font-weight: 600;
        }

        .usage tbody tr:nth-child(even) {
          background-color: #f2e9ff;
        }

        .usage tbody tr:nth-child(odd) {
          background-color: #ffffff;
        }

        .ai-help-box {
          margin-top: 50px;
          padding: 30px;
          background: #e7d5f7;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 0 12px rgba(0,0,0,0.1);
        }

        .ai-help-box h2 {
          color: black;
          font-size: 1.6rem;
          margin-bottom: 10px;
        }

        .ai-help-box p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 20px;
        }

        .ai-help-box button {
          background-color: #6a1a9c;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .ai-help-box button:hover {
          background-color: #4b007c;
        }
      `}</style>
    </>
  );
}
