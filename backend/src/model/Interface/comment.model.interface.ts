
export default interface Comment extends Document {
    _id: string
    user_id: string
    post_id: string
    comment: string
    date: Date
}