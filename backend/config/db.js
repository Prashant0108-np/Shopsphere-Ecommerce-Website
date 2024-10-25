const mongoose = require('mongoose');

async function connectDB() {
    try {
        // Use MONGODB_URI from .env, fallback to local MongoDB
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ShopSphere';
        
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Successfully connected to MongoDB');
        
        // Optional: Verify connection by querying the `user` model
        const User = mongoose.model('user');
        const sampleUser = await User.findOne();
        console.log("Sample user:", sampleUser);

    } catch (err) {
        console.log("Database connection error:", err);
    }
}

module.exports = connectDB;
