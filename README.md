FixMyStreetAI – Smart Civic Issue Reporting Platform

FixMyStreetAI is an **AI-powered civic grievance reporting and urban issue management system** designed to streamline public grievance redressal.  
It allows **citizens** to report issues like potholes, broken streetlights, garbage dumps, and drainage leaks using **text, images, and GPS locations.**  
Government officials can track, classify, prioritize, and resolve problems through a **smart admin dashboard**.

The platform leverages **Google Gemini AI** for:
- Auto-classification of issue type  
- Severity/priority prediction  
- AI chat assistant for help and guidance  

This makes the system **faster, smarter & more transparent**, improving communication between the public and municipal authorities.

🚀 Features

👤 **Citizen Module**
- User registration & login  
- Submit complaints with text + images + location  
- View personal complaint history  
- Track issue progress: *Pending → In Progress → Resolved*  
- Upvote/comment on nearby issues  
- AI-powered auto classification of complaints  
- Friendly UI for non-technical users  

🛠️ **Admin Module**
- Secure admin login  
- View complaints by **area / type / status / date**  
- Update status & assign priority  
- Add resolution notes  
- Real-time dashboard with charts  
- Heatmap of issue density  
- View recent AI analysis  

 🛡️ **Super Admin Module**
- Manage admin accounts  
- System-level analytics  
- Monitor platform activity  
- Multi-department scaling (Smart City, Water Dept, Electrical Dept, etc.)  

 ❓ **FAQ & Help Module**
- Categorized FAQs  
- Searchable help section  
- Step-by-step guides  
- AI assistant support  
- Contact option for unresolved issues  

 🤖 **AI Chat Assistant**
Powered by **Google Gemini 1.5 Flash**  
- Answers platform questions  
- Guides citizens on reporting  
- Classifies complaint content  
- Suggests department + category  
- 24/7 intelligent support  


🧠 AI Capabilities

| Feature | Description |
|--------|-------------|
| Image Classification | Detects potholes, garbage, sewage leak, etc. |
| Text Classification | Extracts issue type & urgency |
| Auto Department Mapping | Maps issue → correct government department |
| Conversational Assistant | Helps users & admins |

🏗️ Tech Stack

 **Frontend**
- Next.js 14
- React
- Tailwind CSS
- CSS Modules

 **Backend (API Routes)**
- Next.js API Routes  
- Google Generative AI SDK (Gemini 1.5 Flash)
- Node.js

**Database**
- Firebase 

 **AI**
- Google Gemini API

FOLDER STRUCTURE

firebase/
├── firebaseConfig.js

public/
├── images/
├── icons/

src/
├── pages/
│ ├── index.js
│ ├── about.js
│ ├── citizen.js
│ ├── admin.js
│ ├── superadmin.js
│ ├── faq.js
│ ├── issueclassify.js
│ ├── complaintcount.js
│ ├── api/
│ ├── askai.js
│ ├── classify.js
│

├── styles/
│ ├── globals.css
│ ├── style.css
│


├── components/
│ ├── ChangeStatusForm.js
│ ├── ComplaintCountForm.js
│ ├── ReportIssueForm.js
│ ├── WithdrawIssueForm.js

🖥️ How to Run the Project Locally

 **1. Clone the repository**
git clone https://github.com/yourusername/FixMyStreetAI.git
cd FixMyStreetAI

 **2. Install dependencies**
npm install

**3. Add your environment variables**
Create a file named **.env.local**:
   GOOGLE_API_KEY=your_gemini_api_key_here

**4. Run the development server**
npm run dev

**5. Open in browser**
http://localhost:3000


🌱 Future Enhancements

✔ Mobile app (React Native)
✔ Multi-language support
✔ WhatsApp-based reporting
✔ OCR to read text from images
✔ Geo-fencing alerts
✔ Automatic duplicate complaint detection
✔ Integration with government SMS gateways


🔌 API Endpoints

 **POST /api/askai**
AI chat assistant  

**Request**
```json
{
  "prompt": "How do I report an issue?"
}

POST /api/classify
AI issue classifier
Request:
   {
  "reportText": "There is a pothole near the bus stop"
}

Response:
    {
  "category": "Road Damage",
  "urgency": "High",
  "department": "Public Works Department"
   }


⭐ If you like this project

Please star the repo — it motivates future development!
⭐ Star this repository on GitHub



