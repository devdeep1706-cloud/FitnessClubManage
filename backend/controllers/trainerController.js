import Trainer from "../models/Trainer.js";

// 1. Add Trainer
export const addTrainer = async (req, res) => {
  try {
    const { name, role, image } = req.body;
    if (!name || !role || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTrainer = await Trainer.create({ name, role, image });
    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ message: "Failed to add trainer" });
  }
};

// 2. Get All Trainers (Public)
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trainers" });
  }
};

// 3. Delete Trainer (Admin)
export const deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trainer" });
  }
};