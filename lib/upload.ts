import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// File upload configuration
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png'
]

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

// Generate unique filename
function generateFileName(originalName: string, prefix: string = ''): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  return `${prefix}${timestamp}_${random}.${extension}`
}

// Validate file
function validateFile(file: File, allowedTypes: string[]): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB limit' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' }
  }

  return { valid: true }
}

// Upload file
export async function uploadFile(
  file: File, 
  folder: 'images' | 'documents' | 'avatars' | 'salons' = 'images',
  prefix: string = ''
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    await ensureUploadDir()

    const folderPath = join(UPLOAD_DIR, folder)
    if (!existsSync(folderPath)) {
      await mkdir(folderPath, { recursive: true })
    }

    // Validate file
    const allowedTypes = folder === 'images' || folder === 'avatars' || folder === 'salons' 
      ? ALLOWED_IMAGE_TYPES 
      : ALLOWED_DOCUMENT_TYPES
    const validation = validateFile(file, allowedTypes)
    
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Generate filename and path
    const fileName = generateFileName(file.name, prefix)
    const filePath = join(folderPath, fileName)
    
    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filePath, buffer)
    
    // Return public URL
    const publicUrl = `/uploads/${folder}/${fileName}`
    
    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('File upload error:', error)
    return { success: false, error: 'Failed to upload file' }
  }
}

// Upload multiple files
export async function uploadMultipleFiles(
  files: File[], 
  folder: 'images' | 'documents' | 'avatars' | 'salons' = 'images',
  prefix: string = ''
): Promise<{ success: boolean; urls?: string[]; errors?: string[] }> {
  const results = await Promise.all(
    files.map(file => uploadFile(file, folder, prefix))
  )

  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  if (failed.length > 0) {
    return {
      success: false,
      errors: failed.map(r => r.error || 'Unknown error')
    }
  }

  return {
    success: true,
    urls: successful.map(r => r.url!)
  }
}

// Delete file
export async function deleteFile(url: string): Promise<boolean> {
  try {
    const { unlink } = await import('fs/promises')
    const filePath = join(process.cwd(), 'public', url)
    
    if (existsSync(filePath)) {
      await unlink(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('File deletion error:', error)
    return false
  }
}

// Get file info
export function getFileInfo(file: File) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  }
} 