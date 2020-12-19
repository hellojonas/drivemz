import path from 'path';
import { Router } from 'express';
import { createStorage } from '../utils/multerConfig';
import {
  createQuestion,
  allQuestions,
  findQuestion,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions,
} from '../controllers/question';

const router: Router = Router();

const upload = createStorage(
  path.join(__dirname, '..', 'assets', 'img', 'questions')
);

router
  .route('/')
  .post(upload.single('image'), createQuestion)
  .get(allQuestions);

router.get('/random', getRandomQuestions);

router
  .route('/:id')
  .get(findQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default router;
