import { NoveltyRepository } from '../repositories/novelty.repository';

export async function getLatestNoveltiesQuery() {
  return await NoveltyRepository.findLatest();
}

export async function getAllNoveltiesQuery() {
  return await NoveltyRepository.findAll();
}
