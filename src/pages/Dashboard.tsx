import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getPosts, createPost, updatePost, deletePost, createCategory } from '../services/api';
import { Post } from '../types';
import toast from 'react-hot-toast';
import Select from 'react-select';

export const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<{ title: string; content: string; categories: number[] }>({
    title: '', content: '', categories: []
  });
  const [categoryOptions, setCategoryOptions] = useState<{ value: number; label: string }[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  // Load posts from API
  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      toast.error('Failed to load posts');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');  // Sesuaikan dengan endpoint backend untuk kategori
      const categories = await response.json();
      setCategoryOptions(
        categories.map((category: { id: number; name: string }) => ({
          value: category.id,
          label: category.name
        }))
      );
    } catch {
      toast.error('Failed to load categories');
    }
  };

  const handleCategoryCreate = async () => {
    if (!newCategory) {
      toast.error('Please enter a category name');
      return;
    }
    try {
      // Kirimkan hanya { name: newCategory }
      await createCategory({ name: newCategory });
      setNewCategory('');
      loadCategories();  // Reload kategori setelah menambah
      toast.success('Category created successfully');
    } catch {
      toast.error('Failed to create category');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categoryIds = formData.categories;
      const { categories, ...rest } = formData;  // Pisahkan kategori dari formData sebelum dikirim

      if (currentPost) {
        // Mengupdate post yang sudah ada
        await updatePost(currentPost.id, { ...rest, category_ids: categoryIds });
        toast.success('Post updated successfully');
      } else {
        // Membuat post baru
        await createPost({
          ...rest, category_ids: categoryIds, categories: []  // Kategori sudah dikelola dalam category_ids
        });
        toast.success('Post created successfully');
      }
      setIsModalOpen(false);
      setCurrentPost(null);
      setFormData({ title: '', content: '', categories: [] });
      loadPosts();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        loadPosts();
      } catch {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <button
            onClick={() => {
              setCurrentPost(null);
              setFormData({ title: '', content: '', categories: [] });
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setCurrentPost(post);
                    setFormData({
                      title: post.title,
                      content: post.content,
                      categories: post.categories.map((category) => category.id) || [],
                    });
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">
                {currentPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categories</label>
                  <Select
                    isMulti
                    options={categoryOptions}
                    value={categoryOptions.filter(option => formData.categories.includes(option.value))}
                    onChange={(selected) => setFormData({
                      ...formData,
                      categories: selected ? selected.map(option => option.value) : [],
                    })}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Create New Category</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleCategoryCreate}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {currentPost ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
