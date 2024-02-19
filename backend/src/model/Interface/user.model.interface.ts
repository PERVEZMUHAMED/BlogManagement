

export default interface User extends Document {
    _id: string
    userName: string
    email: string
    password: string
    personalDetails: {
        gender: string
        age: number
        mobileNo: string
    }
    role: string
}