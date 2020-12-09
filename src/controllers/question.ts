import Question from '../models/Question';
import IQuestion from '../interfaces/IQuestion';
import { Handler } from 'express';
import forwardError from '../utils/forwardError';
import createError from 'http-errors';
import isJson from '../utils/isJson';

const exists = async (id: string, errorMessage: string): Promise<IQuestion> => {
  const question = await Question.findById(id);

  if (!question) {
    const err = new createError.NotFound(errorMessage);
    throw err;
  }

  return question;
};

export const createQuestion: Handler = forwardError(async (req, res, next) => {
  if (isJson(req.body.options)) {
    req.body.options = JSON.parse(req.body.options);
  }
  const question = new Question(req.body);
  const savedQuestion = await question.save();
  res.json(savedQuestion);
});

export const allQuestions: Handler = forwardError(async (req, res, next) => {
  const questions = await Question.find();
  res.json(questions);
});

export const findQuestion: Handler = forwardError(async (req, res, next) => {
  const question = await exists(req.params.id, 'Question not found');
  res.json(question);
});

export const updateQuestion: Handler = forwardError(async (req, res, next) => {
  await exists(req.params.id, 'Question not found');
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedQuestion);
});

export const deleteQuestion: Handler = forwardError(async (req, res, next) => {
  await exists(req.params.id, 'Question not found');
  const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
  res.json(deletedQuestion);
});
