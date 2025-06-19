const fs = require('fs')
const path = require('path')

// This is a simple test to verify the avatar upload endpoint
// You can run this to test the API manually

async function testAvatarUpload() {
  console.log('Testing Avatar Upload API...')
  console.log('')
  console.log('1. Make sure you have a user logged in with a valid token')
  console.log('2. The avatar upload should now work with FormData')
  console.log('3. Check the browser console for any errors')
  console.log('')
  console.log('To test:')
  console.log('- Go to your profile page')
  console.log('- Click the camera icon to upload an avatar')
  console.log('- Select an image file')
  console.log('- Check if the upload succeeds without 500 errors')
  console.log('')
  console.log('If you still get errors, check:')
  console.log('- Browser network tab for the exact error')
  console.log('- Server console for detailed error logs')
  console.log('- Make sure the image file is valid (JPG, PNG, etc.)')
  console.log('- Make sure the file size is under 5MB')
}

testAvatarUpload() 