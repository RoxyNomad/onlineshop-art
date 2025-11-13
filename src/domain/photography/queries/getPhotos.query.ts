import { PhotoRepository } from '../repositories/photo.repository';

export async function getAllPhotosQuery() {
  return await PhotoRepository.findAll();
}

export async function getPhotosByCategoryQuery(categoryId: string) {
  return await PhotoRepository.findByCategory(categoryId);
}
