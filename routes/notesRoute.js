const { getNotes, createNotes, getNoteById, upsdateNote, deleteNote } = require('../controllers/notesController')
const {protected} = require('../middleware/authMiddleware')

const router = require('express').Router()

router.route('/').get(protected, getNotes)
router.route('/create').post(protected , createNotes)
router.route('/:id').get(getNoteById).put(protected , upsdateNote)
.delete(protected, deleteNote)
// .put()
// .delete()
module.exports = router
