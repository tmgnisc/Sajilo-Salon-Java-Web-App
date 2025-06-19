import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { registerSchema, hashPassword, generateToken } from '@/lib/auth'
import { uploadFile, uploadMultipleFiles } from '@/lib/upload'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const userData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      userType: formData.get('userType') as 'user' | 'salon-owner',
      salonName: formData.get('salonName') as string || null,
      salonType: formData.get('salonType') as string || null,
      salonAddress: formData.get('salonAddress') as string || null,
      salonDescription: formData.get('salonDescription') as string || null,
    }

    // Debug: Log the received data
    console.log('Received registration data:', userData)

    // Validate input
    const validation = registerSchema.safeParse(userData)
    if (!validation.success) {
      console.log('Validation errors:', validation.error.errors)
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { userType, ...validatedData } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          password: hashedPassword,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: userType === 'salon-owner' ? 'SALON_OWNER' : 'CUSTOMER',
        }
      })

      let salon = null

      // If salon owner, create salon
      if (userType === 'salon-owner') {
        // Handle file uploads
        let imageUrl = null
        let documents: { name: string; type: string; url: string }[] = []

        // Upload salon image
        const salonImage = formData.get('salonImage') as File
        if (salonImage && salonImage.size > 0) {
          const imageResult = await uploadFile(salonImage, 'images', 'salon_')
          if (imageResult.success) {
            imageUrl = imageResult.url
          }
        }

        // Upload salon documents
        const salonDocuments = formData.getAll('salonDocuments') as File[]
        if (salonDocuments.length > 0) {
          const documentsResult = await uploadMultipleFiles(salonDocuments, 'documents', 'doc_')
          if (documentsResult.success && documentsResult.urls) {
            documents = documentsResult.urls.map((url, index) => ({
              name: salonDocuments[index].name,
              type: 'OTHER', // You can enhance this to detect document type
              url
            }))
          }
        }

        // Create salon
        salon = await tx.salon.create({
          data: {
            name: validatedData.salonName || '',
            type: validatedData.salonType as any || 'MULTI_SERVICE',
            address: validatedData.salonAddress || '',
            description: validatedData.salonDescription || null,
            imageUrl,
            ownerId: user.id,
          }
        })

        // Create salon documents
        if (documents.length > 0) {
          await tx.salonDocument.createMany({
            data: documents.map(doc => ({
              name: doc.name,
              type: doc.type as any,
              url: doc.url,
              salonId: salon.id
            }))
          })
        }

        // Update user with salon reference
        await tx.user.update({
          where: { id: user.id },
          data: { salonId: salon.id }
        })
      }

      return { user, salon }
    })

    // Generate token
    const token = generateToken({
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role
    })

    // Send welcome email
    try {
      await sendWelcomeEmail(
        result.user.email,
        `${result.user.firstName} ${result.user.lastName}`,
        userType
      )
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the registration if email fails
    }

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = result.user

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          ...userWithoutPassword,
          salon: result.salon
        },
        token
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 