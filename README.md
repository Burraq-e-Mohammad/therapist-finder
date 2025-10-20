# Therapist Finder

A comprehensive web application for finding and connecting with mental health professionals in Pakistan. Built with React, TypeScript, Node.js, and PostgreSQL.

## 🌟 Features

- **Advanced Search & Filtering**: Find therapists by name, expertise, location, experience, and consultation mode
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Filtering**: Dynamic filter options with live counts
- **Pagination**: Efficient browsing through large therapist databases
- **Detailed Profiles**: Comprehensive therapist information and contact details

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database
- **Prisma** ORM
- **CSV Data Import** for bulk therapist data

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/therapist-finder.git
   cd therapist-finder
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up the database**
   ```bash
   cd server
   
   # Create .env file
   cp .env.example .env
   
   # Update DATABASE_URL in .env with your PostgreSQL connection string
   DATABASE_URL="postgresql://username:password@localhost:5432/therapist_finder?schema=public"
   
   # Generate Prisma client
   npm run db:generate
   
   # Create database schema
   npm run db:push
   
   # Import therapist data
   npm run db:seed
   ```

4. **Start the development servers**
   ```bash
   # Start the backend server (from server directory)
   npm run dev
   
   # Start the frontend server (from client directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
therapist-finder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── data/           # Static data
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── scripts/        # Database scripts
│   ├── prisma/             # Database schema
│   └── data/               # CSV data files
└── README.md
```

## 🔧 Available Scripts

### Client (Frontend)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server (Backend)
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Import CSV data
npm run db:studio    # Open Prisma Studio
```

## 🎯 API Endpoints

### Therapists
- `GET /api/v1/therapists` - List therapists with filtering and pagination
- `GET /api/v1/therapists/:id` - Get single therapist details
- `GET /api/v1/therapists/stats` - Get therapist statistics

### Search
- `GET /api/v1/search` - Search therapists with text query and filters

### Filters
- `GET /api/v1/filters` - Get available filter options with counts

## 🎨 Features in Detail

### Search & Filtering
- **Text Search**: Search by therapist name, expertise, education, or description
- **Location Filter**: Filter by city
- **Experience Filter**: Filter by years of experience ranges
- **Gender Filter**: Filter by therapist gender
- **Fee Range Filter**: Filter by consultation fees
- **Consultation Mode**: Filter by in-person, online, or both

### User Interface
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Pagination**: Navigate through results with numbered pagination
- **Sorting**: Sort by experience, fees (low to high, high to low)
- **Real-time Updates**: Filters update results instantly

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables for API URL

### Backend (Railway/Render/Heroku)
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy the server directory
4. Run database migrations and seeding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Therapist data sourced from Pakistan Mental Health profiles
- UI components built with Radix UI
- Icons provided by Lucide React
- Built with modern web technologies for optimal performance and user experience
