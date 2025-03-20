# 🤖 AI Image Generation and Community Sharing Platform

This project is an AI-powered image generation website where users can create images using prompts and share their creations on a community page. The platform utilizes a model from Hugging Face for image generation and stores images in Cloudinary.

## Project Structure
- **Frontend**: Vite (React + JavaScript) at port `5127`.
- **Backend**: Node.js server at port `8080`, using Express, Mongoose, and Cloudinary for image storage.
- **Database**: MongoDB Atlas cluster connected via credentials in `.env`.

## Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB Atlas account](https://www.mongodb.com/products/platform/atlas-database)
- [Cloudinary account](https://cloudinary.com/)
- [Hugging Face API access](https://huggingface.co/models)

### Environment Variables
Create a `.env` file in the `server` folder with:
```plaintext
# MongoDB
MONGO_URI=<Your_MongoDB_Atlas_URI>

# Hugging Face API
HUGGINGFACE_ACCESS_TOKEN=<Your_Hugging_Face_Token>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-image-generation-community.git
   cd ai-image-generation-community
   ```

2. **Install Frontend (Client)**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Runs at [http://localhost:5127](http://localhost:5127)

3. **Install Backend (Server)**
   ```bash
   cd server
   npm install
   npm start
   ```
   Runs at [http://localhost:8080](http://localhost:8080)

### API Endpoints

- **Generate Image**: `POST /api/v1/dalle` - Generates an image using the Hugging Face model.
- **Create Post**: `POST /api/v1/post` - Stores user-generated image posts in MongoDB and uploads images to Cloudinary.

## Features
- **Image Generation**: Uses Hugging Face API for AI-generated images.
- **Community Sharing**: Allows users to post images and view other users' posts.
- **Image Storage**: Images are stored securely in Cloudinary.

### Example Usage

```javascript
// Frontend Image Generation
const generateImage = async (prompt) => {
  const response = await fetch('http://localhost:8080/api/v1/dalle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: prompt }),
  });
  const data = await response.json();
  return `data:image/jpeg;base64,${data.photo}`;
};
```

```javascript
// Backend Image Posting
router.post('/post', async (req, res) => {
  const { name, prompt, photo } = req.body;
  const photoUrl = await cloudinary.uploader.upload(photo);
  const newPost = await Post.create({ name, prompt, photo: photoUrl.url });
  res.json({ success: true, data: newPost });
});
```

## Technologies
- **Frontend**: Vite, React, JavaScript
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **AI Model**: Hugging Face API
- **Image Storage**: Cloudinary

--- 
