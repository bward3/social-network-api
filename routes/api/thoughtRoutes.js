const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  getReactions,
  deleteReaction,
  createReaction
} = require("../../controllers/thoughtController");


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').get(getReactions).post(createReaction).delete(deleteReaction);

module.exports = router;