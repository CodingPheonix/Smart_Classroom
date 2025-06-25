import mongoose from "mongoose"

export async function connect_to_mongo() {
    // const mongoURL = 'mongodb+srv://sybisuas115:MY@2ndaC@cluster0.dgjwatv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    // const mongoURL = 'mongodb://localhost:27017/classroom'
    const mongoURL = process.env.MONGO_URL

    await mongoose.connect(`${mongoURL}`)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.error('MongoDB connection error:', err));
}