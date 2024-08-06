"use client"
import { useState } from 'react';
import Link from 'next/link';
import CommentItem from '@/app/components/CommentItem';

// Static data for testing
const blogPost = {
  id: '1',
  title: 'Understanding React Hooks',
  author: 'Jane Doe',
  createAt: new Date('2023-08-15T10:00:00'),
  content: `
    React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class. This means you can easily add state management to your functional components.

    The most commonly used hooks are:

    1. useState: For adding state to functional components.
    2. useEffect: For performing side effects in functional components.
    3. useContext: For consuming context in functional components.

    Hooks make it easier to reuse stateful logic between components and make components easier to understand. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.
  `,
};

const initialComments = [
  { id: '1', author: 'John Smith', content: 'Great article! Very informative.', createdAt: new Date('2023-08-16T14:30:00') },
  { id: '2', author: 'Alice Johnson', content: 'I learned a lot from this. Thanks for sharing!', createdAt: new Date('2023-08-17T09:15:00') },
];

export default function BlogPage() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const comment = {
      id: (comments.length + 1).toString(),
      content: newComment,
      author: 'Current User',
      createdAt: new Date(),
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
      
      <article className="mb-8">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{blogPost.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>By <span className="font-medium">{blogPost.author}</span></p>
            <time dateTime={blogPost.createAt.toISOString()}>
              {blogPost.createAt.toLocaleDateString()} {blogPost.createAt.toLocaleTimeString('en-US')}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {blogPost.content}
        </div>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {comments.map((comment) => (
          <CommentItem comment={comment} />
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