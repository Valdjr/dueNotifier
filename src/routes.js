import { Router } from 'express'

import Product from './controllers/ProductController'

const routes = new Router()

routes.post('/product', Product.store)
routes.put('/product/:id', Product.update)
routes.get('/product/:id', Product.index)
routes.get('/products', Product.list)
routes.delete('/product/:id', Product.remove)

export default routes
