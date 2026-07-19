import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати список усіх нотаток з пагінацією, фільтрацією та пошуком

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (search) {
    notesQuery.where({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

// Отримати одну нотатку за id

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
};

// Новий контролер для створення нової нотатки

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

// Видалення існуючої нотатки за її ідентифікатором

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({ _id: noteId });
  if (!deletedNote) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(deletedNote);
};

// Оновлення існуючої нотатки за її ідентифікатором

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });

  if (!updatedNote) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(updatedNote);
};
