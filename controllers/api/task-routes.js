const router = require('express').Router();
const { Task } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbTaskData = await Task.findAll({});
    if (!dbTaskData) {
      res.status(400).json({ message: 'No tasks were found!' });
    } else {
      res.status(200).json(dbTaskData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbTaskData = await Task.create({
      content: req.body.content,
      date: req.body.date,
      userId: req.body.userId,
    });

    const task = dbTaskData.get({ plain: true });
    res.status(200).json(dbTaskData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
