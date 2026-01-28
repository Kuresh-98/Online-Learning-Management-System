const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

/**
 * Configure Cloudinary with credentials from .env
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Storage for Video uploads
 */
const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lms/videos', // Cloudinary folder
        resource_type: 'video', // Upload type
        allowed_formats: ['mp4', 'mov', 'avi', 'mkv'],
        transformation: [{ quality: 'auto' }] // Auto optimize quality
    }
});

/**
 * Storage for Document/PDF uploads
 */
const documentStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lms/documents',
        resource_type: 'raw', // For PDFs and other files
        allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx']
    }
});

/**
 * Storage for Image uploads (thumbnails, profile pictures)
 */
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lms/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }]
    }
});

/**
 * Multer middleware for different upload types
 */
const uploadVideo = multer({
    storage: videoStorage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max for videos
    }
});

const uploadDocument = multer({
    storage: documentStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max for PDFs
    }
});

const uploadImage = multer({
    storage: imageStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max for images
    }
});

/**
 * Function to delete file from Cloudinary
 * @param {String} publicId - Cloudinary public_id
 * @param {String} resourceType - 'video', 'image', or 'raw'
 */
const deleteFromCloudinary = async (publicId, resourceType = 'video') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return result;
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        throw error;
    }
};

module.exports = {
    cloudinary,
    uploadVideo,
    uploadDocument,
    uploadImage,
    deleteFromCloudinary
};