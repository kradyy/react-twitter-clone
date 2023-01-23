export interface Tweet extends TweetBody {
    _id: string,
    _updatedAt: string,
    _createdAt: string,
    _rev: string,
    _type: "tweet",
    blockTweet: boolean
}

export type TweetBody = {
    text: string,
    author: any
    image?: string
}

export interface Comment extends CommentBody {
    _id: string,
    _updatedAt: string,
    _createdAt: string,
    _rev: string,
    _type: "comment",
    tweet: {
        _ref: string,
        _type: "reference"
    }
}

export type CommentBody = {
    comment: string,
    author: any
}