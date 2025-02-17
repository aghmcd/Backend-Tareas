import 'dotenv/config';
import cloudinary from 'cloudinary';

const cloudNameCloudinary = process.env.CLOUD_NAME;
const apikeyCloudinary = process.env.API_KEY_CLOUDINARY;
const apiSecCloudinary = process.env.API_SECRET_CLOUDINARY;

cloudinary.v2.config({
    cloud_name: cloudNameCloudinary,
    api_key: apikeyCloudinary,
    api_secret: apiSecCloudinary
});

let avatarUrl = '';
export const uploadResult = async (avatarPath, nombre) => {
    const result = await cloudinary.v2.uploader.upload(avatarPath, {
        folder: 'user_avatar',
        public_id: nombre.toLowerCase(),
        overwrite: true
    });
    avatarUrl = result.secure_url;
    return avatarUrl;
}