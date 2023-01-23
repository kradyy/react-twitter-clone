import { Comment, CommentBody } from '../typings'

export const postComment = async (tweetId: any, commentBody: CommentBody) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment/${tweetId}`, {
        body: JSON.stringify(commentBody),
        method: 'POST',
    })
    
    const data = await res.json()
    return data
}