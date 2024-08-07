"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CommentItem from '@/app/components/CommentItem';
import axios from '@/app/utils/api/axiosInstance';
import { useParams } from 'next/navigation';
import { Post, Comment } from '@/app/utils/@types';

export default function BlogPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  const getPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}/`);
      setPost(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching post:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      const res = await axios.post(`/posts/${post.id}/comments/`, { content: newComment });
      setPost({
        ...post,
        comments: [...(post.comments || []), res.data]
      });
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!post) {
    return <div>Loading...</div>;
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
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {post.comments && post.comments.map((comment, index) => (
          <CommentItem key={comment.id || index} comment={comment} />
        ))}
      </section>

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
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Comment
        </button>
      </form>
    </main>
  );
}