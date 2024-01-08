const router = require('express').Router();

const {
    getThought,
    postThought,
    getSingleThought,
    updateSingleThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController.js');

// get all thoughts and post a new thought

router.route('/').get(getThought).post(postThought);

// /api/thoughts/:thoughtId  (gets a single thought, updates a thought, deletes a thought)

router.route('/:thoughtId').get(getSingleThought).put(updateSingleThought).delete(deleteThought);
    
// /api/thoughts/reactions (gets a single thought's reactions)

router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionsId (deletes a single thought's reaction by id)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;