import { Document } from 'mongoose';

interface QuestionOption {
  _id: string;
  id?: string;
  text: string;
}

export default interface IQuestion extends Document {
  questionText: string;
  options: QuestionOption[];
  correctOption: string;
  image: string;
  category: 'laws' | 'signs';
}
