import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const email = 'johndoe@vallete.com'
const password = '123456'

export async function createAndAuthenticateUserTest(app: FastifyInstance) {
  const password_hash = await hash(password, 6)

  const { id: userId } = await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      password_hash,
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return {
    token,
    userId,
  }
}