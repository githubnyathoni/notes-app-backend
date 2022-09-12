/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      id, title, tags, body, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.find((item) => item.id === id);

    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const indexOfNote = this._notes.findIndex((note) => note.id === id);

    if (indexOfNote === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[indexOfNote] = {
      ...this._notes[indexOfNote],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const indexOfNote = this._notes.findIndex((note) => note.id === id);

    if (indexOfNote === -1) {
      throw new Error('Gagal menghapus catatan. Id tidak ditemukan');
    }

    this._notes.splice(indexOfNote, 1);
  }
}

module.exports = NotesService;
