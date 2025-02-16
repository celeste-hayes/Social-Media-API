import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// All users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts');
    
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// New user
export const createUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.create(req.body);
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update existing user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!dbUserData) {
      res.status(404).json({ message: 'No user with this ID' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

    if (!dbUserData) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    // Delete associated thoughts
    await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

    // Remove user from others friends lists
    await User.updateMany(
      { friends: req.params.userId },
      { $pull: { friends: req.params.userId } }
    );

    // Ensure user is deleted
    const deletedUser = await User.findById(req.params.userId);
    if (deletedUser) {
      console.log("User was not deleted:", deletedUser);
      return res.status(500).json({ message: 'User deletion failed' });
    }
    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json(err);
  }
};

// Add a friend to friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!dbUserData) {
      res.status(404).json({ message: 'No user with this ID' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a friend from friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!dbUserData) {
      res.status(404).json({ message: 'No user with this ID' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};


