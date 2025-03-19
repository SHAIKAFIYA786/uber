const mongoose=require('mongoose');
const blocklistSchema = new mongoose.Schema({
    token: { type: String,unique:true, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 86400 seconds = 24 hours
});

module.exports = mongoose.model('Blocklist', blocklistSchema);