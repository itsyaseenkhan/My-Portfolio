# Portfolio Project with Cloudinary Image Management

This portfolio project now includes a comprehensive **Cloudinary-based image management system** for handling all image uploads, storage, and optimization.

## 🚀 New Features Added

### Cloudinary Integration
- ✅ **Cloud Image Storage**: All images stored on Cloudinary
- ✅ **Automatic Optimization**: Images optimized for web delivery
- ✅ **Responsive Images**: Multiple sizes for different devices
- ✅ **Image Transformations**: Automatic resizing and format conversion
- ✅ **Secure Uploads**: File validation and size limits
- ✅ **Easy Management**: Upload, update, delete with automatic cleanup

### System Components
- 🔧 **Config**: Centralized Cloudinary configuration (`Backends/config/cloudinary.js`)
- 🔄 **Middleware**: Image upload handling (`Backends/middleware/imageUpload.js`)
- 🛠️ **Service**: Image operations service (`Backends/services/imageService.js`)
- 📡 **API**: Enhanced project routes with image support
- 🎨 **Frontend**: React component for testing uploads
- 📚 **Documentation**: Comprehensive setup guide

## 🛠️ Quick Setup

1. **Get Cloudinary credentials** from [cloudinary.com](https://cloudinary.com)
2. **Create `.env` file** in `Backends/` directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. **Install dependencies**: `cd Backends && npm install`
4. **Test the system**: `node scripts/testImageSystem.js`
5. **Start the server**: `node Server.js`

## 📋 API Endpoints

- `POST /api/projects` - Create project with image
- `GET /api/projects` - Get all projects with filtering
- `PUT /api/projects/:id` - Update project and image
- `DELETE /api/projects/:id` - Delete project and cleanup image

## 📁 File Structure
```
Backends/
├── config/cloudinary.js      # Cloudinary setup
├── middleware/imageUpload.js  # Upload middleware  
├── services/imageService.js   # Image operations
├── routes/ProjectRoutes.js    # Enhanced routes
├── Models/Project.js          # Updated model
├── scripts/testImageSystem.js # Test script
└── docs/CLOUDINARY_SETUP.md   # Full documentation
```

For detailed setup instructions, see `Backends/docs/CLOUDINARY_SETUP.md`

---
