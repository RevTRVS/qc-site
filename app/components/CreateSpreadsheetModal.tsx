"use client";

import { useState } from "react";
import { Spreadsheet } from "@/app/types";

interface CreateSpreadsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Spreadsheet, "id" | "likes" | "views">) => void;
}

export default function CreateSpreadsheetModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateSpreadsheetModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    thumbnail: "",
    category: "General",
    link: "",
    authorAvatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      likes: 0,
      views: 0,
      shares: 0,
    });
    setFormData({
      title: "",
      author: "",
      description: "",
      thumbnail: "",
      category: "General",
      link: "",
      authorAvatar: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-white">
            Create Spreadsheet <span className="text-green-500">✨</span>
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter spreadsheet title"
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your spreadsheet"
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Author Avatar URL */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Author Avatar URL
            </label>
            <input
              type="url"
              name="authorAvatar"
              value={formData.authorAvatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.png"
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
            >
              <option>General</option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Beauty</option>
              <option>Home</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Spreadsheet Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              placeholder="https://docs.google.com/spreadsheets/..."
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 text-gray-300 font-bold rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
            >
              Create Spreadsheet ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
