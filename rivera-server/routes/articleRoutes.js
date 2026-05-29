const express = require('express');

const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.get('/name/:name', getArticleByName);

router.route('/')
  .get(getArticles)
  .post(createArticle);

router.route('/:id')
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;
