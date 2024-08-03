const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll()
  .then((allTag) => {
    res.json(allTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  });
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const thisTag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(thisTag);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }).then ((updateTag) => {
      res.json(updateTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "No Update", err });
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delTag) => {
      if (delTag === 0) {
        return res.status(404).json({ msg: "no category" });
      }
      res.json(delTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

module.exports = router;
