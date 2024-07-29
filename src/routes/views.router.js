import { Router } from 'express'
import {
    renderProductsPage,
    renderRealTimeProductsPage,
    renderChatPage,
    renderCartPage,
    renderLoginPage,
    renderRegisterPage,
    renderProfilePage,
    renderNotFoundPage
} from '../controllers/views.controller.js'
import { mockingProducts } from '../controllers/products.controller.js'
import { isAuthenticated, isNotAuthenticated, checkRole } from '../middlewares/auth.js'

const viewsRouter = Router()

viewsRouter.get('/products', isAuthenticated, renderProductsPage)
viewsRouter.get('/realtimeproducts', isAuthenticated, checkRole(['admin']), renderRealTimeProductsPage)
viewsRouter.get('/chat', isAuthenticated, checkRole(['user']), renderChatPage)
viewsRouter.get('/carts/:cid', isAuthenticated, checkRole(['user']), renderCartPage)
viewsRouter.get(['/', '/login'], isNotAuthenticated, renderLoginPage)
viewsRouter.get('/register', isNotAuthenticated, renderRegisterPage)
viewsRouter.get('/profile', isAuthenticated, renderProfilePage)
viewsRouter.get('/mockingproducts', mockingProducts)
viewsRouter.get('*', renderNotFoundPage)

export default viewsRouter
