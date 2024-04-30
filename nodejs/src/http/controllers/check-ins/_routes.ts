import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createCheckInController } from './create'
import { historyCheckInsController } from './history'
import { validateCheckInController } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  /* must be authenticated */
  app.addHook('onRequest', verifyJwt)

  app.post('/check-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
  app.get('/check-ins/history', historyCheckInsController)
}
