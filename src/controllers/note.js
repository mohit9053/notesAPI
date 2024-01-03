const Note = require('../models/Notes');
const User = require('../models/User');

const getNotes = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const userWithNotes = await User.findById(userId).populate('notes');
        res.json(userWithNotes.notes);
    } catch (err) {
        next(err);
    }
};

const createNote = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const { title, content } = req.body;
        const newNote = await Note.create({ title, content, user: userId });

        const user = await User.findById(userId);
        user.notes.push(newNote._id); 
        await user.save();

        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
};

const getNote = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if(note.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to view this note' });
        }
        res.json(note);
    } catch (err) {
        next(err);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user._id; 
        const { title, content } = req.body;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to update this note' });
        }

        const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content, updatedAt: new Date() }, { new: true });
        res.json(updatedNote);
    } catch (err) {
        next(err);
    }
};


const deleteNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user._id; 

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this note' });
        }

        await Note.findByIdAndDelete(noteId);
        res.status(200).send("Note deleted");
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
}