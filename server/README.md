# Therapist Finder Backend API

A robust Node.js backend API for the Therapist Finder application, built with Express.js, TypeScript, and PostgreSQL.

## 🚀 Features

- **RESTful API** with comprehensive therapist data management
- **Advanced Search & Filtering** with pagination and sorting
- **PostgreSQL Database** with Prisma ORM for type-safe queries
- **CSV Data Import** for bulk therapist data processing
- **Performance Optimized** with efficient database queries
- **Security Features** including rate limiting and CORS protection
- **TypeScript** for type safety and better development experience

## 📋 API Endpoints

### Therapists
- `GET /api/v1/therapists` - List all therapists with filtering and pagination
- `GET /api/v1/therapists/:id` - Get single therapist details
- `GET /api/v1/therapists/stats` - Get therapist statistics

### Filters
- `GET /api/v1/filters` - Get available filter options with counts

### Search
- `GET /api/v1/search` - Search therapists with text query and filters

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - Database ORM
- **CSV Parser** - Data import
- **Zod** - Data validation

## 📦 Installation

1. **Clone the repository and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Run the setup script:**
   ```bash
   node setup.js
   ```

3. **Create your `.env` file:**
   ```bash
   copy env.example .env
   ```

4. **Update `.env` with your database credentials:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/therapist_finder?schema=public"
   ```

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

7. **Create database schema:**
   ```bash
   npm run db:push
   ```

8. **Import CSV data:**
   ```bash
   npm run db:seed
   ```

9. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate       # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:seed          # Import CSV data
npm run db:studio        # Open Prisma Studio

# Other
npm run setup            # Run setup script
```

## 📊 Database Schema

### Therapist Model
```typescript
{
  id: string              // Unique identifier
  name: string            // Therapist name
  profileUrl: string      // Profile URL
  gender: string          // Male/Female
  city: string            // City location
  experienceYears: number  // Years of experience
  email: string           // Contact email
  phone: string           // Contact phone
  modes: string[]         // Consultation modes
  education: string[]     // Education background
  experience: string[]    // Work experience
  expertise: string[]     // Areas of expertise
  about: string           // About description
  fees: number            // Consultation fees
  feesRaw: string         // Original fee string
  feesCurrency: string    // Currency (PKR)
}
```

## 🔍 API Usage Examples

### Get All Therapists with Filtering
```bash
GET /api/v1/therapists?page=1&limit=10&cities=Karachi,Lahore&genders=Female&feeRange=Rs.2000-4000
```

### Search Therapists
```bash
GET /api/v1/search?q=anxiety&cities=Islamabad&experienceRange=5-10 years
```

### Get Filter Options
```bash
GET /api/v1/filters
```

### Get Single Therapist
```bash
GET /api/v1/therapists/therapist-id-here
```

## 🎯 Filter Options

### Cities
- Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad, Larkana, Abbottabad, Other

### Experience Ranges
- 0-5 years
- 5-10 years  
- 10-15 years
- 15+ years

### Fee Ranges
- Under Rs.2000
- Rs.2000-4000
- Rs.4000-6000
- Above Rs.6000

### Consultation Modes
- In-person
- Online
- Both

### Gender
- Male
- Female

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable origin restrictions
- **Helmet.js** - Security headers
- **Input Validation** - Request parameter validation
- **Error Handling** - Comprehensive error responses

## 📈 Performance Features

- **Database Indexing** - Optimized queries
- **Parallel Processing** - Concurrent database operations
- **Pagination** - Efficient data loading
- **Caching** - Response optimization
- **Compression** - Gzip compression

## 🌐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/therapist_finder?schema=public"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# API
API_PREFIX=/api/v1
```

## 🚀 Deployment

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Render
1. Create new Web Service
2. Connect repository
3. Set build command: `npm run build`
4. Set start command: `npm start`

### Vercel
1. Install Vercel CLI
2. Run `vercel` in project directory
3. Configure environment variables

## 📝 Data Import

The application includes a CSV import script that processes therapist data from `data/pakmh_profiles - pakmh_profiles.csv`. The script:

- Parses and normalizes data fields
- Handles missing or malformed data
- Creates database records in batches
- Provides import statistics

## 🔧 Development

### Project Structure
```
server/
├── src/
│   ├── controllers/     # API controllers
│   ├── routes/         # Express routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── scripts/        # Database scripts
│   └── index.ts        # Main server file
├── prisma/
│   └── schema.prisma   # Database schema
├── data/              # CSV data files
└── dist/              # Compiled output
```

### Adding New Features

1. **New API Endpoint:**
   - Add controller in `src/controllers/`
   - Create route in `src/routes/`
   - Update main server file

2. **Database Changes:**
   - Update `prisma/schema.prisma`
   - Run `npm run db:push`
   - Update seed script if needed

3. **New Utility Functions:**
   - Add to `src/utils/`
   - Export and import where needed

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Verify credentials

2. **CSV Import Fails:**
   - Check CSV file path
   - Verify data format
   - Check database permissions

3. **TypeScript Errors:**
   - Run `npm run build` to check
   - Update type definitions
   - Check Prisma client generation

### Debug Mode
```bash
NODE_ENV=development npm run dev
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check database logs
4. Verify environment configuration

## 🎉 Success!

Your Therapist Finder backend is now ready! The API provides all the functionality needed for your frontend application with robust filtering, searching, and data management capabilities.
