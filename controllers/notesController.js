
const Notes = require("./../models/notesModels")
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler(async (req, res) => {

    const notes = await Notes.find({ user: req.user._id })
    res.json(notes)

})

const createNotes = asyncHandler(
    async (req, res) => {
        const { title, desc, category } = req.body
        if (!title || !desc || !category) {
            res.status(400)
            throw new Error("please fill all the fields")

        }
        else {
            const note = new Notes({ user: req.user._id, title, desc, category })
            const createdNote = await note.save()
            res.status(201).json(createdNote)
        }

    }
)

const getNoteById = asyncHandler(
    async (req, res) => {
        const note = await Notes.findById(req.params.id);
        console.log(note)
        if (note) {
            res.json(note)
        } else {
            res.status(404).json({ message: "Note not found ! " })
        }
    }
)

const upsdateNote = asyncHandler(
    async (req, res) => {
        const { title, category, desc } = req.body
        const note = await Notes.findById(req.params.id)
        // console.log(req.user._id.toString())
        // console.log(note.user.toString())

        if (note.user.toString() !== req.user._id.toString()) {
            res.status(401)
            throw new Error('you cant perform this action')
        }
        if (note) {
            note.title = title,
                note.desc = desc,
                note.category = category

                console.log(note,'xx')
            const updated = await note.save()
            res.json(updated)

        } else {
            res.status(404);
            throw new Error("note not found")
        }
    }
)
const deleteNote = asyncHandler(
    async (req, res) => {
        const note = await Notes.findById(req.params.id)
console.log(note,'delete')

        if (note.user.toString() !== req.user._id.toString()) {
            res.status(401)
            throw new Error('you cant perform this action')
        }
        if (note) {
            await Notes.deleteOne(note._id)
              
            res.json("Note deleted.")
        } else {
            res.status(404).json('note not found')
        }
    }
)

module.exports = { getNotes, createNotes, getNoteById, upsdateNote, deleteNote }