import express from 'express'
import { AuthRoutes } from "../routes/auth.js"
const router = express.Router()

const routes = [{ path: '/auth', route: AuthRoutes }]

routes.map(route => router.use(route.path, route.route))

export const ApplicationRoutes = router;