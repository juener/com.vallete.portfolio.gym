import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { env } from '@/env'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title ?? null,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.items.find((gym) => gym.id === gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * env.APP_ROWS_PER_PAGE, page * env.APP_ROWS_PER_PAGE)

    return gyms
  }
}
