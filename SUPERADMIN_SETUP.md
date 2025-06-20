# Superadmin Setup and Usage

## Overview
The Sajilo Salon platform includes a superadmin role with elevated privileges to manage the entire system.

## Superadmin Features

### Access Control
- **Role**: `SUPERADMIN`
- **Access Level**: Full system access
- **Protected Routes**: `/superadmin/*`

### Available Pages
- **Dashboard**: `/superadmin` - Overview and system statistics
- **Salon Management**: `/superadmin/salons` - Manage all salons in the system

### Navigation
- **Sidebar Navigation**: Collapsible sidebar with dashboard and salon management
- **Logout Function**: Secure logout that clears all authentication data

## Authentication Flow

### Login Process
1. Superadmin users log in through the regular `/auth` page
2. Upon successful login, they are automatically redirected to `/superadmin`
3. The customer navbar is hidden for superadmin users
4. Only the superadmin sidebar is displayed

### Role-Based Redirects
- **Superadmin**: Redirected to `/superadmin`
- **Salon Owner/Admin**: Redirected to `/admin`
- **Regular Users**: Redirected to `/` (home page)

## Default Superadmin Credentials

```
Email: admin@gmail.com
Password: admin
```

## Creating a Superadmin User

### Option 1: Using the Seed Script
```bash
npm run seed:superadmin
```

### Option 2: Manual Database Insert
You can manually create a superadmin user in the database with:
- `role: 'SUPERADMIN'`
- `isVerified: true`
- `isActive: true`

## Security Features

### Middleware Protection
- All `/superadmin/*` routes are protected by middleware
- Only users with `SUPERADMIN` role can access these routes
- Unauthorized access attempts are redirected to home page

### Token Validation
- JWT tokens are validated on every request
- Expired or invalid tokens result in logout and redirect to login

## UI Components

### SuperadminSidebar
- **Location**: `components/superadmin/superadmin-sidebar.tsx`
- **Features**: 
  - Collapsible navigation
  - Dashboard and salon management links
  - Logout functionality
  - Responsive design

### Layout Structure
- **Route Group**: `app/(superadmin)/`
- **Layout**: `app/(superadmin)/layout.tsx`
- **Styling**: Clean, professional admin interface

## Development Notes

### Role Constants
The system uses the following role constants:
- `CUSTOMER` - Regular users
- `SALON_OWNER` - Salon owners
- `ADMIN` - System administrators
- `SUPERADMIN` - Super administrators

### Database Schema
The `User` model includes:
```prisma
model User {
  role UserRole @default(CUSTOMER)
  // ... other fields
}

enum UserRole {
  CUSTOMER
  SALON_OWNER
  ADMIN
  SUPERADMIN
}
```

## Troubleshooting

### Common Issues
1. **Access Denied**: Ensure user has `SUPERADMIN` role in database
2. **Redirect Loop**: Check middleware configuration
3. **Missing Sidebar**: Verify superadmin layout is properly configured

### Debug Steps
1. Check user role in database
2. Verify JWT token contains correct role
3. Check browser console for errors
4. Verify middleware is running correctly 