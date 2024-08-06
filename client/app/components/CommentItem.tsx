import { Comment } from "../utils/@types"

interface CommentProps{
    comment: Comment
}

export default function CommentItem({comment}: CommentProps){

    return(
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">{comment.author}</p>
              <time className="text-xs text-gray-500" dateTime={comment.createdAt.toISOString()}>
                {comment.createdAt.toLocaleDateString()} {comment.createdAt.toLocaleTimeString('en-US')}
              </time>
            </div>
            <p>{comment.content}</p>
          </div>
    )
}