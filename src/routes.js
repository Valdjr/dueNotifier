import { Router } from 'express'

import Product from './controllers/ProductController'

const routes = new Router()

routes.post('/product', Product.store)
routes.put('/product/:id', Product.update)
routes.get('/products', Product.index)

export default routes
