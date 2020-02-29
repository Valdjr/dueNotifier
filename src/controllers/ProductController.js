import { parseISO, format } from 'date-fns'
import mongoose from 'mongoose'
import '../models/Product'
const Product = mongoose.model('products')

class ProductController {
    async store(req, res) {
        const { name, due } = req.body
        const errors = validateProduct(name, due)
        if (errors.length > 0) {
            return res.json({ errors })
        } else {
            const parsedDue = parseISO(due)

            const newProduct = {
                name,
                due: parsedDue,
            }

            new Product(newProduct).save()

            return res.json({ success: true })
        }
    }

    async index(req, res) {
        console.log('aaaaa')
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.json({
                    errors: { product: 'Produto não encontrado' },
                })
            }
            res.json(product)
        }).catch(err => {
            return res.json({ errors: { product: 'Produto não encontrado' } })
        })
    }

    async list(req, res) {
        const filters = {}
        if (req.query.name) {
            filters.name = { $regex: '.*' + req.query.name + '.*' }
        }
        if (req.query.due) {
            filters.due = parseISO(req.query.due)
        }
        Product.find(filters, (err, products) => {
            if (err) {
                return res.json({
                    errors: { product: 'Produto não encontrado' },
                })
            }
            res.json(products)
        }).catch(err => {
            return res.json({ errors: { product: 'Produto não encontrado' } })
        })
    }

    async update(req, res) {
        if (!req.body.name || !req.body.due) {
            return res.json({
                errors: { product: 'Dados insuficientes' },
            })
        }
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.json({
                    errors: { product: 'Produto não encontrado' },
                })
            }
            const { name, due } = req.body
            const errors = validateProduct(name, due)
            if (errors.length > 0) {
                return res.json({ errors })
            } else {
                product.name = name
                product.due = parseISO(due)
                product.save()
                return res.json({ success: true })
            }
        }).catch(err => {
            return res.json({ errors: { product: 'Produto não encontrado' } })
        })
    }

    async remove(req, res) {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.json({
                    errors: { product: 'Produto não encontrado' },
                })
            }
            Product.deleteOne({ _id: req.params.id }).then(err => {
                return res.json({ success: true })
            })
        }).catch(err => {
            return res.json({ errors: { product: 'Produto não encontrado' } })
        })
    }
}

function validateProduct(name, due) {
    const errors = []
    if (!name) {
        errors.push({ name: 'Informe um nome para o produto.' })
    }
    if (!due) {
        errors.push({
            due: 'Informe uma data de validade para o produto.',
        })
    }
    return errors
}

export default new ProductController()
