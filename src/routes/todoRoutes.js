import express from 'express'
const router = express.Router()
import prisma from '../prismaClient.js'


// Get all todos for logged-in user
router.get('/', async (req, res) => {
    const todo = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todo)
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body
    const todo = await prisma.todo.create({
        data: {
            task,
            userId:req.userId
        }
    })

    res.json({ todo })
})

// Update a todo
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const todo = await prisma.todo.update({
        where:{
            id:parseInt(id),
            userId: req.id
        },
        data:{
            completed: !!completed
        }
    })
    res.json({todo})
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const todo = await prisma.todo.delete({
        where:{
            id:parseInt(id),
            userId:req.userId
        }
    })

    res.send({ message: "Todo deleted" })
})

export default router