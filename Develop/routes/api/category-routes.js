const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
  .then((allCategories) => {
    res.json(allCategories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  });
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const thisCategory = await Category.findByPk(req.params.id);
    res.json(thisCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }).then ((updateCategory) => {
      res.json(updateCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "No Update", err });
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delCategory) => {
      if (delCategory === 0) {
        return res.status(404).json({ msg: "no category" });
      }
      res.json(delCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

module.exports = router;
