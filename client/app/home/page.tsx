"use client";
import React, { useState, useEffect } from 'react';
import axios from '@/app/utils/api/axiosInstance';
import { Post } from '@/app/utils/@types';
import { useAuth } from '../utils/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Modal from '@/app/components/Modal';
import HeaderNav from '../components/HeaderNav';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const { user, token, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("User:", user);
        console.log("Token:", token);
        if (token) {
            fetchPosts();
        }
    }, [user, token]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts/', {
                headers: { Authorization: `Token ${token}` }
            });
            setPosts(response.data);
        } catch (error: any) {
            console.error('Error fetching posts:', error);
            if (error.response?.status === 401) {
                logout();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await axios.put(`/posts/${editingId}/`, { title, content }, {
                    headers: { Authorization: `Token ${token}` }
                });
            } else {
                await axios.post('/posts/', { title, content }, {
                    headers: { Authorization: `Token ${token}` }
                });
            }
            setTitle('');
            setContent('');
            setEditingId(null);
            setIsModalOpen(false);
            fetchPosts();
        } catch (error: any) {
            console.error('Error submitting post:', error);
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (post: Post) => {
        setTitle(post.title);
        setContent(post.content);
        setEditingId(post.id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        setIsDeleting(id);
        try {
            await axios.delete(`/posts/${id}/`, {
                headers: { Authorization: `Token ${token}` }
            });
            fetchPosts();
        } catch (error: any) {
            console.error('Error deleting post:', error);
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setIsDeleting(null);
        }
    };

    const openModal = () => {
        setTitle('');
        setContent('');
        setEditingId(null);
        setIsModalOpen(true);
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <main className="bg-gray-50">
            <main className="px-8 p-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-lg font-medium text-blue-600">All Blog Posts</h1>
                    <button
                        onClick={openModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
                    >
                        <FiPlus className="mr-2" /> New Post
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-blue-800 mb-2">{post.title}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-4">{post.content}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                                >
                                    <FiEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className={`text-red-500 hover:text-red-600 transition duration-300 ${isDeleting === post.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isDeleting === post.id}
                                >
                                    {isDeleting === post.id ? (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <FiTrash2 size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Post" : "Create New Post"}>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Post Title"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Post Content"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={10}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                editingId ? 'Update Post' : 'Create Post'
                            )}
                        </button>
                    </form>
                </Modal>
            </main>
        </main>
    );
}
