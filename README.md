
# ChatArea

ChatArea is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and chat with other registered users. The application features real-time communication using WebSockets and supports both one-on-one and group chats.

## Features

- User registration and authentication
- Real-time one-on-one chat
- Real-time group chat
- Online status indicators
- Responsive user interface

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: SCSS, Material-UI

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivox31/ChatArea.git
   cd chatarea
   ```

2. **Install dependencies for the backend**
   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend` directory and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the backend server**
   ```bash
   cd server
   npm start
   ```

6. **Run the frontend development server**
   ```bash
   cd ../client
   npm start
   ```

   The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:5000`.

### Running the tests

Currently, there are no automated tests. Manual testing is recommended to ensure all functionalities work as expected.

## Usage

1. **Register** a new user account.
2. **Log in** with the created account.
3. **Start chatting** by selecting a user from the available users panel.
4. **Create a group chat** by selecting multiple users.

## Folder Structure

```
chatarea/
├── server/                # Node.js and Express backend
│   ├── config/             # Configuration files (e.g., DB connection)
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point for the backend
│   └── ...                 # Other backend files
├── client/               # React frontend
│   ├── public/             # Public assets
│   ├── src/                # React components and utilities
│   ├── App.js              # Main React component
│   ├── index.js            # Entry point for React
│   └── ...                 # Other frontend files
└── README.md               # This README file
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes. Make sure to follow the project's code style and include relevant tests.


## Acknowledgments

- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)

## Contact

For any inquiries or feedback, please contact vishal kalwani (mail to : vishalkalwani623@gmail.com)
