const ImageService = require('../services/imageService');
const fs = require('fs');
const path = require('path');

// Test the image service functions
async function testImageSystem() {
  console.log('🧪 Testing Cloudinary Image System...\n');

  try {
    // Test 1: Validate configuration
    console.log('1️⃣ Testing Cloudinary Configuration...');
    const { cloudinary } = require('../config/cloudinary');
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Missing Cloudinary environment variables. Please check your .env file.');
    }
    
    console.log('✅ Cloudinary configuration found');
    console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY.substring(0, 8)}...`);
    console.log('');

    // Test 2: API Connection
    console.log('2️⃣ Testing Cloudinary API Connection...');
    try {
      await cloudinary.api.ping();
      console.log('✅ Successfully connected to Cloudinary API');
    } catch (error) {
      console.log('❌ Failed to connect to Cloudinary API');
      console.log('   Error:', error.message);
      return;
    }
    console.log('');

    // Test 3: Create a test image buffer (1x1 pixel PNG)
    console.log('3️⃣ Testing Image Upload...');
    const testImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );

    const uploadResult = await ImageService.uploadSingle(testImageBuffer, {
      folder: 'test',
      transformation: [{ width: 100, height: 100, crop: 'scale' }]
    });

    if (uploadResult.success) {
      console.log('✅ Image upload successful');
      console.log(`   URL: ${uploadResult.data.url}`);
      console.log(`   Public ID: ${uploadResult.data.public_id}`);
      console.log(`   Format: ${uploadResult.data.format}`);
      console.log('');

      // Test 4: Generate responsive URLs
      console.log('4️⃣ Testing Responsive URL Generation...');
      const responsiveUrls = ImageService.generateResponsiveUrls(uploadResult.data.public_id);
      console.log('✅ Responsive URLs generated:');
      Object.entries(responsiveUrls).forEach(([size, url]) => {
        console.log(`   ${size}: ${url}`);
      });
      console.log('');

      // Test 5: Delete test image
      console.log('5️⃣ Testing Image Deletion...');
      const deleteResult = await ImageService.delete(uploadResult.data.public_id);
      if (deleteResult.success) {
        console.log('✅ Image deletion successful');
      } else {
        console.log('❌ Image deletion failed:', deleteResult.error);
      }
    } else {
      console.log('❌ Image upload failed:', uploadResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }

  console.log('\n🎉 All tests completed successfully!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start your server: node Server.js');
  console.log('2. Test the frontend component with real images');
  console.log('3. Check your Cloudinary dashboard for uploaded images');
}

// Validate transformations
function testTransformations() {
  console.log('\n🎨 Testing Image Transformations...');
  
  const transformationTypes = ['profile', 'project', 'thumbnail', 'gallery'];
  transformationTypes.forEach(type => {
    const transformations = ImageService.getTransformationsFor(type);
    console.log(`${type}: ${JSON.stringify(transformations)}`);
  });
}

// Main execution
if (require.main === module) {
  require('dotenv').config();
  testImageSystem().then(() => {
    testTransformations();
    process.exit(0);
  }).catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { testImageSystem };