import { Schema, model } from 'mongoose';
import IQuestion from '../interfaces/IQuestion';

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: [true, 'Question must not be empty'],
  },
  options: {
    type: [
      {
        _id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    required: [true, 'Question must have at least 2 options'],
  },
  image: {
    type: String,
    required: [true, 'Question must have an image'],
  },
  correctOption: {
    type: String,
    required: [true, 'Question Must have a correct option'],
  },
  category: {
    type: String,
    enum: ['laws', 'signs'],
    required: [true, 'category must be either laws or signs'],
  },
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
