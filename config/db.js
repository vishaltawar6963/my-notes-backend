const mongoose = require('mongoose')
const connectDb = async () => {
 try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongoDB connected: ${conn.connection.host} `);
 } catch (error) {
        console.error(`error : ${error}`)
 }

}

module.exports = connectDb