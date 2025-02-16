import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getSingleUser);

router.post('/', createUser);
router.post('/:userId/friends/:friendId', addFriend);

router.put('/:userId', updateUser);

router.delete('/:userId', async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:userId/friends/:friendId', removeFriend);

export default router;