import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { MaxTimeExceeded } from './errors/max-time-exceeded'

interface ValidadeCheckInUseCaseRequest {
  checkInId: string
}

interface ValidadeCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInUseCaseRequest): Promise<ValidadeCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    const differenceOfMinutesBetweenCheckInAndValidation = dayjs(
      checkIn.validated_at,
    ).diff(checkIn.created_at, 'minutes')

    if (differenceOfMinutesBetweenCheckInAndValidation > 30) {
      throw new MaxTimeExceeded()
    }

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
