import { useState, useEffect } from 'react';

export default function ComplaintCounterForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [districts, setDistricts] = useState([
    { name: 'Chennai', count: 15 },
    { name: 'Coimbatore', count: 22 },
    { name: 'Tirunelveli', count: 18 },
    { name: 'Tirchy', count: 30 },
    { name: 'Madurai', count: 12 },
  ]);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDistricts(districts);
    } else {
      setFilteredDistricts(
        districts.filter(district =>
          district.name.toLowerCase() === searchTerm.toLowerCase()
        )
      );
    }
  }, [searchTerm, districts]);

  return (
    <div className="container">
      <div className="search-container">
        <label>Search District:</label>
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <option value="">--All Districts--</option>
          {districts.map((district, index) => (
            <option key={index} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div className="district-list">
        <h3>District Complaint Counts</h3>
        <ul>
          {filteredDistricts.map((district, index) => (
            <li key={index}>
              {district.name}: {district.count} complaints
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          max-width: 1900px;
          margin: auto;
          padding: 40px;
          background-color: #e9d5ff; /* Light purple background */
          min-height: 100vh;
        }

        .search-container {
          margin-top: 20px;
        }

        label {
          font-weight: bold;
          display: block;
          margin-bottom: 8px;
          color: #333; /* Dark text for readability */
        }

        select {
          padding: 10px;
          font-size: 16px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          color: #333; /* Dark text for readability */
        }

        .district-list {
          margin-top: 20px;
        }

        h3 {
          color: #333; /* Dark text for readability */
        }

        .district-list ul {
          list-style: none;
          padding: 0;
        }

        .district-list li {
          padding: 8px 0;
          border-bottom: 1px solid #ddd;
          color: #333; /* Dark text for readability */
        }
      `}</style>
    </div>
  );
}