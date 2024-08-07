"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CommentItem from '@/app/components/CommentItem';
import axios from '@/app/utils/api/axiosInstance';
import { useParams } from 'next/navigation';
import { Post, Comment } from '@/app/utils/@types';
import { useAuth } from '@/app/utils/providers/AuthProvider';

export default function BlogPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/posts/${id}/`);
      setPost(res.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !user) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(`/posts/${post.id}/comments/`, { content: newComment }, {
        headers: { Authorization: `Token ${user.token}` }
      });
      setPost(prevPost => ({
        ...prevPost!,
        comments: [...(prevPost?.comments || []), res.data]
      }));
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center">Post not found.</div>;
  }

  return (
    <main className="mx-auto py-8 md:px-24 px-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
      
      <article className="mb-8">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>By <span className="font-medium text-lg">{post.author.username}</span><span className='text-sm'> ({post.author.email})</span></p>
            <time dateTime={post.create_at?.toISOString()}>
              {post.create_at?.toLocaleDateString()} {post.create_at?.toLocaleTimeString('en-US')}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments ({post.comments?.length})</h2>
        <div className="pl-12">
          {post.comments && post.comments.map((comment, index) => (
            <CommentItem key={comment.id || index} comment={comment} />
          ))}
        </div>
      </section>

      {user && (
        <form onSubmit={handleSubmitComment} className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </form>
      )}
    </main>
  );
}
