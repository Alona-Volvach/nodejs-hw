import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: '',
      trim: true,
    },

    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Створюємо текстовий індекс для пошуку по title та content
noteSchema.index({ title: 'text', content: 'text' });

// Складений індекс для фільтрації за користувачем і тегом
noteSchema.index({ userId: 1, tag: 1 });

export const Note = model('Note', noteSchema);
