import { Blog } from "@/app/utils/@types"
import Link from "next/link"

interface BlogProps {
    blog: Blog
}

export default function BlogItem({ blog }: BlogProps) {
    return (
        <Link href={`/blog/4`} className="block">
            <article className="w-full max-w-md border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <header className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-sm text-gray-600">
                        <span className="text-blue-500">&gt;_</span>&nbsp;{blog.author}
                    </h3>
                    <time className="text-xs text-gray-400" dateTime={blog.createAt?.toISOString()}>
                        {blog.createAt?.toLocaleDateString()} {blog.createAt?.toLocaleTimeString('en-US')}
                    </time>
                </header>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">{blog.title}</h4>
                <p className="font-light text-gray-600 line-clamp-3">
                    {blog.content}
                </p>
            </article>
        </Link>
    )
}