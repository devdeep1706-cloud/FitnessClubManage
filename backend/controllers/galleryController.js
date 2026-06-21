import Gallery from "../models/Gallery.js";

// 1. Get All Images (Public)
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

// 2. Add Image (Admin)
export const addImage = async (req, res) => {
  try {
    const { image, category } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const newImage = await Gallery.create({ image, category });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Failed to add image" });
  }
};

// 3. Delete Image (Admin)
export const deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image" });
  }
};