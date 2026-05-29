const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ title: 1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({
      name: req.params.name.toLowerCase(),
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const name = String(req.body.name || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    const existing = await Article.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: 'Article name already exists.' });
    }

    const article = await Article.create({
      name,
      title: String(req.body.title || '').trim(),
      image: String(req.body.image || '').trim(),
      content: Array.isArray(req.body.content)
        ? req.body.content
        : String(req.body.content || '')
            .split('\n\n')
            .map((p) => p.trim())
            .filter(Boolean),
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const name = String(req.body.name || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    const duplicate = await Article.findOne({
      name,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Article name already exists.' });
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        name,
        title: String(req.body.title || '').trim(),
        image: String(req.body.image || '').trim(),
        content: Array.isArray(req.body.content)
          ? req.body.content
          : String(req.body.content || '')
              .split('\n\n')
              .map((p) => p.trim())
              .filter(Boolean),
      },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
};
