# 🚘 Truest Ride

A trusted ride-sharing platform designed specifically for students. Connect with fellow students, share rides, split costs, and build community through safe and affordable travel.

## About

Truest Ride empowers students with safe, low-cost travel options by connecting them within their campus community. Built on trust and verified networks, our platform makes it easy to offer rides, find travel companions, and explore new destinations together.

### Key Features

- **Student-Focused**: Designed specifically for university students and campus communities
- **Real-time Chat**: Integrated messaging system for ride coordination
- **Smart Matching**: Find rides based on your destination and schedule
- **Cost Sharing**: Split travel expenses with fellow passengers
- **Safety First**: Built-in safety features and community trust system

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API requests

### Backend

- **Flask** - Python web framework
- **MongoDB** - NoSQL database
- **Socket.io** - Real-time messaging

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/veerendranath0312/truest-ride.git
   cd truest-ride
   ```

2. **Set up the Frontend**

   ```bash
   cd client
   yarn install
   ```

3. **Set up the Backend**

   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

4. **Environment Configuration**

   Create `.env` files in both `client` and `server` directories:

   **Client (.env)**

   ```env
   VITE_CORS_ORIGINS=http://127.0.0.1:5000,https://truest-ride.onrender.com
   VITE_SOCKET_URL=http://127.0.0.1:5000,https://truest-ride.onrender.com
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   **Server (.env)**

   ```env
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://truestride.vercel.app
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   FLASK_ENV=DEVELOPMENT
   FLASK_APP=app.py
   SECRET_KEY=your_jwt_secret_key
   ACCESS_TOKEN_EXPIRES=604800
   OTP_MAX_AGE=1800
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   ```

   **Important Notes:**

   - Replace `your_mongodb_connection_string` with your actual MongoDB URI
   - Generate a secure `SECRET_KEY` for production
   - Use Gmail App Password for `MAIL_PASSWORD` (not your regular Gmail password)
   - `ACCESS_TOKEN_EXPIRES` is in seconds (604800 = 7 days)
   - `OTP_MAX_AGE` is in seconds (1800 = 30 minutes)
   - Add your production frontend URL to `CORS_ORIGINS`

### Running the Application

1. **Start the Backend**

   ```bash
   cd server
   python app.py
   ```

2. **Start the Frontend**

   ```bash
   cd client
   yarn dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Features Overview

### For Ride Providers

- **Offer Rides**: Create ride listings with destination, date, and available seats
- **Manage Bookings**: Accept or decline ride requests
- **Chat Integration**: Communicate with passengers through built-in messaging

### For Ride Seekers

- **Find Rides**: Search for available rides by destination and date
- **Book Instantly**: Reserve seats with one-click booking

## 🏗 Project Structure

```
truest-ride/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── server/                 # Flask backend
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   └── app.py              # Main application file
└── README.md
```

## 🚀 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel with automatic deployments from the main branch.

### Backend (Render)

The backend is deployed on Render at: https://truest-ride.onrender.com

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for any improvements.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, support, or feedback:

- Email: truestride.team@gmail.com
- Website: [Truest Ride](https://truestride.vercel.app)

## 🙏 Acknowledgments

- Kent State University for supporting this project
- All the students who provided feedback and testing
- [Literal Club](https://literal.club) for design inspiration and aesthetic guidance
- The open-source community for the amazing tools and libraries

---

**Built with ❤️ by students, for students.**
