# Sajilo Salon - Authentication System

A comprehensive salon management platform with user and salon owner authentication, built with Next.js, Prisma, and TypeScript.

## 🚀 Features

### Authentication System
- **User Registration**: Customer and Salon Owner registration
- **Login/Logout**: Secure authentication with JWT tokens
- **Password Reset**: Email-based password reset functionality
- **Role-based Access**: Different dashboards for customers and salon owners
- **File Upload**: Salon images and document uploads
- **Email Notifications**: Welcome emails and password reset emails

### Salon Owner Features
- **Salon Profile**: Complete salon information management
- **Document Upload**: Business license, GST certificate, etc.
- **Salon Verification**: Admin approval system
- **Service Management**: Add and manage salon services
- **Booking Management**: Handle customer bookings

### Customer Features
- **Salon Discovery**: Browse and search salons
- **Booking System**: Book appointments with preferred salons
- **Review System**: Rate and review salon experiences
- **Profile Management**: Personal information and booking history

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: JWT tokens, bcrypt password hashing
- **File Upload**: Local file system (configurable for cloud storage)
- **Email**: Nodemailer with Gmail SMTP
- **UI Components**: Radix UI, shadcn/ui

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sajilo-salon
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # JWT Secret (generate a secure random string)
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

   # Email Configuration (Gmail)
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Push schema to database
   pnpm db:push

   # (Optional) Open Prisma Studio
   pnpm db:studio
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in your `.env.local` file

### Database Setup

The application uses SQLite by default for development. For production:

1. **PostgreSQL**: Update `DATABASE_URL` in your environment variables
2. **MySQL**: Change the provider in `prisma/schema.prisma`

### File Upload

The application stores files locally by default. For production, consider:

- **Cloudinary**: For image and document storage
- **AWS S3**: For scalable file storage
- **Google Cloud Storage**: Alternative cloud storage

## 📁 Project Structure

```
sajilo-salon/
├── app/
│   ├── api/auth/           # Authentication API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Salon owner dashboard
│   └── (customer)/        # Customer pages
├── components/
│   ├── auth/              # Authentication components
│   ├── customer/          # Customer-specific components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── auth.ts            # Authentication utilities
│   ├── db.ts              # Database configuration
│   ├── email.ts           # Email service
│   └── upload.ts          # File upload utilities
├── prisma/
│   └── schema.prisma      # Database schema
└── public/
    └── uploads/           # File uploads directory
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Protected Routes
- `/admin/*` - Salon owner dashboard
- `/profile` - User profile
- `/bookings` - Booking management
- `/notifications` - User notifications

## 🎨 UI Components

The application uses shadcn/ui components with a custom purple/rose gradient theme:

- **Colors**: Purple (#667eea) to Rose (#764ba2) gradient
- **Typography**: Clean, modern fonts
- **Components**: Fully responsive and accessible
- **Icons**: Lucide React icons

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables**
4. **Deploy**

### Other Platforms

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Zod schema validation
- **File Upload Security**: Type and size validation
- **CORS Protection**: Configured for production
- **Rate Limiting**: API rate limiting (recommended)

## 📧 Email Templates

The application includes beautiful email templates for:

- **Welcome Emails**: Personalized welcome messages
- **Password Reset**: Secure password reset links
- **Salon Verification**: Approval/rejection notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Review the code examples

## 🔄 Updates

Stay updated with the latest features and security patches by:

- Following the repository
- Checking the releases page
- Reading the changelog

---

**Built with ❤️ for the salon industry** 