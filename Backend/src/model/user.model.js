import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    // Application Specific Fields
    address: { type: String },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
        isPublic: { type: Boolean, default: false }
    },
    dob: { type: Date },
    heading: { type: String }, // Professional Headline
    about: { type: String },
    experience: [{
        title: String,
        company: String,
        duration: String,
        description: String
    }],
    skills: [{ type: String }],
    achievements: [{ type: String }],
    interests: [{ type: String }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Calculate profile completion percentage
userSchema.virtual('profileCompletion').get(function () {
    let completedFields = 0;
    const totalFields = 7; // Name(1), Address(1), DOB(1), Job/Exp(1), Skills(1), Achievement(1), Interest(1)

    // Name is required, so always counts if present (which it is)
    if (this.name) completedFields++;
    if (this.address) completedFields++;
    if (this.dob) completedFields++;
    if (this.experience && this.experience.length > 0) completedFields++;
    if (this.skills && this.skills.length > 0) completedFields++;
    if (this.achievements && this.achievements.length > 0) completedFields++;
    if (this.interests && this.interests.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
});

const User = mongoose.model("User", userSchema);
export default User;
