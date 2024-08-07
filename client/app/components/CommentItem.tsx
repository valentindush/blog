import { Comment } from "../utils/@types"

interface CommentProps{
    comment: Comment
}

export default function CommentItem({comment}: CommentProps){

    return(
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="">
                <p className="font-medium">@{comment.author.username}</p>
                <p className="text-xs font-light">{comment.author.email}</p>
              </div>
              <time className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()} {new Date(comment.created_at).toLocaleTimeString('en-US')}
              </time>
            </div>
            <p>{comment.content}</p>
          </div>
    )
}