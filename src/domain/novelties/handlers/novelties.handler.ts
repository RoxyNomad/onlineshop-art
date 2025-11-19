import { NoveltiesRepository } from "@/domain/novelties/repositories/novelties.repository";
import { FilterNoveltiesDTO } from "@/domain/novelties/dtos/novelties.dto";
import { NoveltiesEntity } from "@/domain/novelties/entities/novelties.entity";

export async function getNoveltiesByFilter(filters: FilterNoveltiesDTO): Promise<NoveltiesEntity[]> {
  return await NoveltiesRepository.findByFilter(filters);
}
