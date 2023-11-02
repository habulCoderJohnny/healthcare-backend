import express from 'express'
const router = express.Router()

const routes = [{ path: '/auth', authRoutes }]

routes.map(route => router.use(route.path, route.authRoutes))

export default router;