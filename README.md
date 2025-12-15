# Word to Image Generator

A web application that generates images from text using a backend API. This project consists of a Vue.js frontend and a Node.js/Express backend, containerized with Docker.

## 📋 Project Structure

```
├── back/                    # Backend (Node.js/Express)
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── swagger.js
│   ├── models/
│   ├── routes/
│   └── .env.example
├── frontend/               # Frontend (Vue.js)
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── App.vue
│   │   ├── main.ts
│   │   ├── App.css
│   │   ├── assets/
│   │   └── service/
│   │       └── apiService.ts
│   ├── .env
│   ├── .env.prod
│   └── .env.example
├── docker-compose.yml      # Docker Compose configuration
└── deploy.sh              # Deployment script for remote servers
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose installed
- Node.js 20+ (for local development)
- npm or yarn

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/clementpickel/Projo_assessement
   cd Projo_assesement
   ```

2. **Setup environment files**
   ```bash
   # Backend
   cp back/.env.example back/.env
   # Edit back/.env with your configuration

   # Frontend
   cp frontend/.env.example frontend/.env
   # Frontend .env should already have the correct development URL
   ```

3. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Documentation (Swagger): http://localhost:3000/api-docs

### Option 2: Local Development

**Backend:**
```bash
cd back
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📱 How It Works

1. **User Input**: The user enters a word in the frontend form
2. **API Request**: The frontend sends a POST request to the backend API with the word
3. **Image Generation**: The backend processes the word and generates an image
4. **Display**: The generated image is displayed in the frontend with a loading animation during the request

### API Endpoint

**POST** `/api/image`

Request:
```json
{
  "word": "example"
}
```

Response: Returns an image blob (binary data)

## 🐳 Docker Deployment

### Build Images
```bash
./deploy.sh
```

This script will:
1. Build both backend and frontend Docker images
2. Save them as compressed tar files
3. Send them via SCP to your remote server
4. Automatically load and run them with docker-compose

### Manual Docker Build
```bash
docker build -t projo-backend:latest ./back/
docker build -t projo-frontend:latest ./frontend/
docker-compose up -d
```

## 📚 API Documentation

When the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs

The Swagger documentation provides interactive API testing and detailed endpoint information.

## 🛠️ Development

### Frontend Technologies
- **Vue 3** with TypeScript
- **Vite** for fast development and building
- **CSS** for styling

### Backend Technologies
- **Node.js** (v20 LTS)
- **Express.js** for REST API
- **Swagger/OpenAPI** for documentation
