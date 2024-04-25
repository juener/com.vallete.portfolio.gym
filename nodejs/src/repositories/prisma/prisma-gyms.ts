import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { GymsRepository, FindManyNearbyParams } from '../gyms-repository'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: env.APP_ROWS_PER_PAGE,
      skip: (page - 1) * env.APP_ROWS_PER_PAGE,
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const gyms = await prisma.gym.findMany({
      where: {
        latitude: params.latitude,
        longitude: params.longitude,
      },
    })

    return gyms
  }
}
