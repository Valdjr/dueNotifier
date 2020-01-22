import { parseISO } from 'date-fns'
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
        Product.find({}, (err, products) => {
            res.json(products)
        }).catch(err => {
            res.json([{}])
        })
    }

    async update(req, res) {
        Product.findById(req.params.id, (err, product) => {
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
