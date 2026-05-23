# V-Tube 📺

A full-stack YouTube-inspired video streaming platform built with modern web technologies. Upload, share, and discover videos with a dynamic user experience.

---

## 🎯 Overview

V-Tube is a personal fullstack project designed to replicate core YouTube functionality. It features a responsive frontend built with React and Vite, powered by an Express backend with MongoDB for data persistence. Users can upload videos, engage through likes/dislikes, leave comments, subscribe to channels, and explore a dynamic video library.

---

## 🛠 Tech Stack

### Frontend
- **React 19.1** - UI library with hooks for state management
- **Vite 7.0** - Lightning-fast build tool with HMR (Hot Module Replacement)
- **Material-UI (MUI) 7.1** - Component library for professional UI
- **Framer Motion 12.23** - Animation library for smooth interactions
- **React Router 7.6** - Client-side routing
- **Axios 1.10** - HTTP client for API calls
- **React-Toastify 11.0** - Toast notifications
- **Emotion (React) 11.14** - CSS-in-JS styling solution

### Backend
- **Node.js + Express 5.1** - REST API framework
- **MongoDB 8.18** - NoSQL database (via Mongoose)
- **JWT (jsonwebtoken 9.0)** - Authentication & authorization
- **bcryptjs 3.0** - Password hashing
- **CORS 2.8** - Cross-Origin Resource Sharing
- **Dotenv 17.2** - Environment variable management
- **Cookie-Parser 1.4** - HTTP cookie handling
- **Nodemon 3.1** - Development server with auto-reload

---

## 📁 Project Structure

```
V-tube/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home/               # Home page with video grid
│   │   │   ├── Videos/             # Video player & details page
│   │   │   ├── Profile/            # User profile & channel info
│   │   │   ├── VideoUpload/        # Video upload form
│   │   │   └── SignUp/             # Authentication pages
│   │   ├── component/
│   │   │   ├── Navbar/             # Top navigation bar
│   │   │   ├── SideNavbar/         # Sidebar navigation
│   │   │   ├── HomePage/           # Video card components
│   │   │   ├── SplashScreen/       # Animated splash screen
│   │   │   ├── Footer/             # Footer section
│   │   │   ├── Login/              # Login form
│   │   │   ├── Icons/              # Custom icons
│   │   │   └── VideoThumbnail/     # Video thumbnail component
│   │   ├── App.jsx                 # Main app component with routes
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   └── index.html                  # HTML template
│
└── V-tubeBackend/                  # Backend (Express + MongoDB)
    ├── Controllers/
    │   ├── user.js                 # User auth & profile logic
    │   ├── video.js                # Video CRUD & interactions
    │   └── comment.js              # Comment management
    ├── Models/
    │   ├── User.js                 # User schema (Mongoose)
    │   ├── Video.js                # Video schema
    │   └── Comment.js              # Comment schema
    ├── Routes/
    │   ├── user.js                 # Auth & user endpoints
    │   ├── video.js                # Video endpoints
    │   └── comment.js              # Comment endpoints
    ├── middleware/
    │   └── authentication.js       # JWT verification middleware
    ├── Connection/
    │   └── conn.js                 # MongoDB connection
    ├── index.js                    # Express server entry point
    ├── package.json                # Backend dependencies
    └── .env                        # Environment variables
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd V-tubeBackend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment files:**
   - Create `.env` (development) and `.env.production` in `V-tubeBackend/`
   ```env
   # .env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vtube
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the backend server:**
   ```bash
   npm run dev          # Development with nodemon
   npm run start        # Production mode
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd V-tube
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev          # Runs Vite dev server (http://localhost:5173)
   ```

4. **Build for production:**
   ```bash
   npm run build        # Creates optimized build in dist/
   npm run preview      # Preview production build locally
   ```

---

## 📡 API Routes

### Authentication Routes (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new user account |
| POST | `/auth/login` | Login user (returns JWT token) |
| GET | `/auth/profile` | Get logged-in user profile |

### Video Routes (`/api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload a new video |
| GET | `/api/all` | Get all videos |
| GET | `/api/:id` | Get video by ID |
| GET | `/api/user/:userId` | Get all videos by user |
| GET | `/api/top` | Get most viewed video |
| PUT | `/api/:id/like` | Like/unlike a video |
| PUT | `/api/:id/dislike` | Dislike/remove dislike |
| PUT | `/api/:id/view` | Increment view count |
| DELETE | `/api/:id` | Delete video (owner only) |

### User Routes (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/:id` | Get user profile |
| POST | `/api/user/:id/subscribe` | Subscribe to user |
| POST | `/api/user/:id/unsubscribe` | Unsubscribe from user |

### Comment Routes (`/commentApi`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/commentApi/add` | Add comment to video |
| GET | `/commentApi/:videoId` | Get comments for video |
| DELETE | `/commentApi/:id` | Delete comment |

---

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT-based authentication
- Secure password hashing using bcryptjs
- Protected API endpoints with token verification
- Cookie-based session management

### 🎥 Video Management
- Upload videos with title, description, thumbnail, and video link
- Categorize videos (videoType field)
- View video details and metadata
- Delete videos (owner authorization)
- Video statistics (view count, creation date)

### 👍 User Engagement
- **Likes & Dislikes**: Toggle like/dislike status on videos
- **View Tracking**: Track unique viewers and view count
- **Comments**: Add, read, and delete comments on videos
- **Subscriptions**: Subscribe/unsubscribe to user channels

### 👤 User Profiles
- Channel profiles with customizable information
- Profile pictures and channel descriptions
- Subscriber/subscription management
- User's video collection display

### 🔍 Discovery
- Search videos by keyword
- Browse all videos on homepage
- Filter videos by category
- Trending/top videos feature

### 🎨 UI/UX
- Responsive design with sidebar navigation
- Smooth animations with Framer Motion
- Material-UI components for consistency
- Animated splash screen on first visit
- Toast notifications for user feedback

---

## 🗄 Database Schema

### User Model
```javascript
{
  channelName: String (required),
  userName: String (required, unique),
  password: String (required, hashed),
  about: String,
  profilePic: String,
  subscribers: [ObjectId],        // Users who subscribed to this channel
  subscribedUsers: [ObjectId],    // Users this user subscribed to
  timestamps: true
}
```

### Video Model
```javascript
{
  user: ObjectId (required),      // Video uploader
  title: String (required),
  description: String,
  videoLink: String (required),   // URL to video file
  thumbnail: String,              // Thumbnail image URL
  videoType: String (default: 'All'),
  views: Number (default: 0),
  viewedBy: [ObjectId],           // Unique viewers
  likes: [ObjectId],              // Users who liked
  dislikes: [ObjectId],           // Users who disliked
  timestamps: true
}
```

### Comment Model
```javascript
{
  video: ObjectId (required),     // Associated video
  user: ObjectId (required),      // Comment author
  text: String (required),
  timestamps: true
}
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development              # or production
PORT=5000                         # Server port
MONGODB_URI=mongodb://localhost:27017/vtube
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

### CORS Configuration
- Frontend URL is whitelisted in backend CORS settings
- Credentials enabled for cookie transmission

---

## 🧪 Development

### Available Scripts

**Frontend:**
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # Run ESLint
```

**Backend:**
```bash
npm run dev       # Start with nodemon (auto-reload)
npm run start     # Production start
npm run test      # Run tests (not implemented)
```

---

## 📦 Key Dependencies Explained

| Dependency | Purpose |
|-----------|---------|
| React Router | Client-side navigation |
| Axios | HTTP requests to backend API |
| JWT | Secure token-based authentication |
| Mongoose | MongoDB ODM for schema validation |
| Express | Node.js web framework |
| Material-UI | React component library |
| Framer Motion | Animation library |
| Vite | Modern build tool with HMR |

---

## 🎯 Future Enhancements

- [ ] Video streaming with adaptive bitrate (HLS/DASH)
- [ ] Advanced search with filters and sorting
- [ ] User recommendations/suggestions
- [ ] Playlist creation and management
- [ ] Live streaming capability
- [ ] Video analytics dashboard for creators
- [ ] Notification system for interactions
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] Video editing/trimming tools
- [ ] Content moderation system
- [ ] Social sharing features
- [ ] Payment integration for monetization
- [ ] Progressive Web App (PWA) capabilities
- [ ] Unit and integration tests

---

## 🔄 V-Tube vs Real YouTube

V-Tube is a **learning project** that implements core YouTube functionality in a simplified manner. Here are the key differences:

### Simplified Features

| Feature | YouTube | V-Tube |
|---------|---------|--------|
| **Video Storage** | Cloud-based (Google infrastructure) | Direct URL links (no built-in storage) |
| **Video Codec Support** | Multiple formats (VP9, H.264, AV1) | Any format via external URL |
| **Streaming** | Adaptive bitrate (360p-4K) | Progressive download (single quality) |
| **Recommendations** | AI-powered ML algorithm | None (browse all videos) |
| **Search** | Advanced filters, relevance ranking | Basic title search |
| **Monetization** | Ad revenue sharing, Super Chat | None implemented |
| **Content Moderation** | ML & human review at scale | None (self-moderated) |
| **Live Streaming** | Full live video capability | Not supported |
| **Playlists** | Detailed playlists with ordering | Not implemented |
| **Notifications** | Real-time for likes, replies, new uploads | Not implemented |
| **Analytics** | Detailed creator dashboard | Basic view count only |
| **Premium Features** | YouTube Premium subscription | None |
| **Community Tab** | Posts, polls, stories | Not available |
| **Shorts** | Short-form video section | Not available |

### Missing at Scale

| Aspect | YouTube | V-Tube |
|--------|---------|--------|
| **Global Reach** | 2+ billion users, multiple datacenters | Single database, local development |
| **CDN Distribution** | YouTube CDN for low-latency streaming | Direct playback, no caching layer |
| **Load Balancing** | Geo-distributed servers | Single backend server |
| **Database Scale** | Distributed database (Spanner/Bigtable) | Single MongoDB instance |
| **Concurrency** | Handles millions of concurrent users | Single-threaded/limited connections |
| **Video Processing** | Real-time transcoding, 20+ formats | Raw video link only |
| **DRM Protection** | DASH-IF license servers | No DRM/protection |

### Intentionally Simplified

1. **Authentication** - Basic JWT only (YouTube uses OAuth2, 2FA)
2. **Video Upload** - Direct URL submission (YouTube encodes on upload)
3. **Comments** - Flat replies only (YouTube has nested threads, pinning)
4. **Channels** - Simple profiles (YouTube has channel memberships, branding)
5. **Copyright** - Manual upload (YouTube auto-detects Content ID)
6. **Privacy** - Public/Private only (YouTube has unlisted, scheduled, members-only)
7. **Database** - No relationships for recommendations (YouTube has graphs)
8. **Performance** - No caching, indexing limited (YouTube uses Memcached, optimized queries)

### Intentionally Excluded

- ❌ Real-time notifications (WebSocket)
- ❌ Video encoding/transcoding
- ❌ Advertisement system
- ❌ Creator monetization
- ❌ Content copyright detection (DMCA)
- ❌ Community guidelines enforcement
- ❌ Mobile app (web-only)
- ❌ Age-restricted content filters
- ❌ Parental controls
- ❌ Multiple language/subtitle support
- ❌ Accessibility features (captions auto-generation)
- ❌ Advanced statistics & analytics

### Learning Scope

V-Tube focuses on:
✅ Full-stack architecture (frontend + backend)
✅ REST API design principles
✅ User authentication & authorization
✅ Database modeling with Mongoose
✅ React component composition
✅ Video discovery & browsing
✅ User engagement (likes, comments)
✅ Channel subscriptions
✅ Responsive UI/UX

---

## 🐛 Known Issues & Improvements

- Add comprehensive error handling and validation
- Implement rate limiting for API endpoints
- Add input sanitization to prevent XSS
- Set up automated testing suite
- Optimize image/video serving
- Implement video compression on upload
- Add logging and monitoring
- Database query optimization with indexes

---

## 📄 License

This project is open source and available under the ISC License.

---

## 👨‍💻 Author

**Yash Sharma**

This is a fullstack learning project showcasing modern web development practices.

---

## 🙏 Acknowledgments

- React and Vite communities
- Material-UI design system
- MongoDB documentation
- Express.js framework
- The open-source community

---

## 📞 Support

For issues, feature requests, or questions, feel free to reach out or open an issue on the repository.

---

**Last Updated:** 2026-05-24
**Status:** Active Development
