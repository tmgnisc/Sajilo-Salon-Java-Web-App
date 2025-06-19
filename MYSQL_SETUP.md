# MySQL Setup Guide for Sajilo Salon

## Backend Architecture Overview

This project uses:
- **Next.js API Routes** (not Express.js) - Built-in backend functionality
- **Prisma ORM** - Database abstraction layer
- **MySQL** - Database (updated from SQLite)

## Required Environment Variables for MySQL

Create a `.env.local` file in your project root with these **essential** variables:

```env
# ========================================
# REQUIRED: DATABASE CONFIGURATION
# ========================================
DATABASE_URL="mysql://username:password@localhost:3306/sajilo_salon"

# ========================================
# REQUIRED: JWT SECURITY
# ========================================
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# ========================================
# REQUIRED: EMAIL CONFIGURATION
# ========================================
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# ========================================
# REQUIRED: APPLICATION URL
# ========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## MySQL Database Setup

### 1. Install MySQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS (using Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
- Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
- Follow the installation wizard

### 2. Create Database and User

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE sajilo_salon;

-- Create user (replace 'your_username' and 'your_password')
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON sajilo_salon.* TO 'your_username'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Update Your .env.local

```env
DATABASE_URL="mysql://your_username:your_password@localhost:3306/sajilo_salon"
```

## Installation Steps

### 1. Install Dependencies

```bash
# Install all dependencies including MySQL client
pnpm install
```

### 2. Generate Prisma Client

```bash
# Generate Prisma client for MySQL
pnpm db:generate
```

### 3. Push Database Schema

```bash
# Create tables in MySQL database
pnpm db:push
```

### 4. Verify Database Connection

```bash
# Open Prisma Studio to verify connection
pnpm db:studio
```

## Email Setup (Required)

### Gmail Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env.local:**
   ```env
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-16-character-app-password"
   ```

## JWT Secret Generation

Generate a secure JWT secret:

```bash
# Generate a random 64-character string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use the output in your `.env.local`:
```env
JWT_SECRET="generated-64-character-string-here"
```

## Complete .env.local Example

```env
# Database
DATABASE_URL="mysql://your_username:your_password@localhost:3306/sajilo_salon"

# JWT
JWT_SECRET="your-generated-64-character-secret-key"

# Email (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-character-app-password"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Troubleshooting

### Common MySQL Issues

1. **Connection Refused:**
   ```bash
   # Check if MySQL is running
   sudo systemctl status mysql
   
   # Start MySQL if not running
   sudo systemctl start mysql
   ```

2. **Access Denied:**
   ```bash
   # Reset MySQL root password
   sudo mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
   FLUSH PRIVILEGES;
   ```

3. **Database Not Found:**
   ```bash
   # Create database manually
   mysql -u root -p
   CREATE DATABASE sajilo_salon;
   ```

### Prisma Issues

1. **Reset Database:**
   ```bash
   # Drop and recreate all tables
   pnpm db:push --force-reset
   ```

2. **Regenerate Client:**
   ```bash
   # Regenerate Prisma client
   pnpm db:generate
   ```

## Production Considerations

### 1. Environment Variables
- Use strong, unique passwords
- Generate new JWT secret for production
- Use production email service

### 2. Database
- Use managed MySQL service (AWS RDS, Google Cloud SQL, etc.)
- Enable SSL connections
- Set up automated backups

### 3. Security
- Enable CORS properly
- Set up rate limiting
- Use HTTPS in production

## API Endpoints

The backend provides these API routes:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

All endpoints are built using Next.js API routes, not Express.js.

## Next Steps

1. **Test the setup:**
   ```bash
   pnpm dev
   ```

2. **Visit:** http://localhost:3000

3. **Test registration:** Create a test user account

4. **Check database:** Use Prisma Studio to verify data

5. **Test email:** Verify password reset functionality 