import { cloudinary } from "@/shared/infrastructure/cloudinary/client";

export class UploadArtworkImageService {
    async uploadImage(fileBuffer: Buffer, folder: string = "art-shop/artworks"): Promise<{ secureUrl: string; publicId: string }> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: "image",
                    transformation: [
                        { width: 1200, height: 1200, crop: "limit" }, // Maximale Auflösung begrenzen
                        { quality: "auto", fetch_format: "auto" },  // Automatische WebP/AVIF Komprimierung
                    ],
                },
                (error, result) => {
                    if (error || !result) {
                        return reject(error || new Error("Cloudinary Upload fehlgeschlagen"));
                    }
                    resolve({
                        secureUrl: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            );

            uploadStream.end(fileBuffer);
        });
    }
}