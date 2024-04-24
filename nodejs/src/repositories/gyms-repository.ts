import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(gymId: string, page: number): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[] | null>
}
