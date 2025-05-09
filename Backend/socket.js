// const socketIo = require('socket.io');
// const userModel = require('./models/user.model');
// const captainModel = require('./models/captain.model');

// let io;

// function initializeSocket(server) {
//     io = socketIo(server, {
//         cors: {
//             origin: '*',
//             methods: ['GET', 'POST']
//         }
//     });

//     // io.on('connection', (socket) => {
//     //     console.log(`Client connected: ${socket.id}`);


//     //     socket.on('join', async (data) => {
//     //         const { userId, userType } = data;

//     //         if (userType === 'user') {
//     //             await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//     //         } else if (userType === 'captain') {
//     //             await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//     //         }
//     //     });

//     //     socket.on('update-location-captain', async (data) => {
//     //         const { userId, location } = data;

//     //         if (!location || !location.ltd || !location.lng) {
//     //             return socket.emit('error', { message: 'Invalid location data' });
//     //         }

//     //         await captainModel.findByIdAndUpdate(userId, {
//     //             location: {
//     //                 ltd: location.ltd,
//     //                 lng: location.lng
//     //             }
//     //         });
//     //     });

//     //     socket.on('disconnect', () => {
//     //         console.log(`Client disconnected: ${socket.id}`);
//     //     });
//     // });
//     io.on('connection', (socket) => {
//         console.log('👋 A new client is trying to connect...');

//         console.log(`✅ Client connected: ${socket.id}`);

//         socket.on('join', async (data) => {
//             console.log('📥 Join event received:', data); // <== Add this line
//             const { userId, userType } = data;
//             if (userType === 'user') {
//                 await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             } else if (userType === 'captain') {
//                 await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             }
//         });

//         socket.on('update-location-captain', async (data) => {
//             const { userId, location } = data;

//             if (!location || !location.ltd || !location.lng) {
//                 return socket.emit('error', { message: 'Invalid location data' });
//             } 

//             await captainModel.findByIdAndUpdate(userId, {
//                 location: {
//                     ltd: location.ltd,
//                     lng: location.lng
//                 }
//             });
//         });
//         const sendMessageToSocketId = (socketId, messageObject) => {

//             console.log(messageObject);
            
//                 if (io) {
//                     io.to(socketId).emit(messageObject.event, messageObject.data);
//                 } else {
//                     console.log('Socket.io not initialized.');
//                 }
//             }
//         socket.on('disconnect', () => {
//             console.log(`❌ Client disconnected: ${socket.id}`);
//         });
//     });

// }


// module.exports = { initializeSocket,sendMessageToSocketId};


// // | 🧩 Part                   | 👦 First-Class Boy Explanation                             |
// // | ------------------------- | ---------------------------------------------------------- |
// // | `initializeSocket()`      | Sets up the real-time chatting system.                     |
// // | `connection`              | When someone opens the app, they connect.                  |
// // | `join`                    | User or captain says, "Hey it's me!" and we remember them. |
// // | `update-location-captain` | Captain sends their current map location.                  |
// // | `disconnect`              | We know if someone leaves.                                 |
// // | `sendMessageToSocketId()`.| We send messages to users/captains anytime.               |

// const socketIo = require('socket.io');
// const userModel = require('./models/user.model');
// const captainModel = require('./models/captain.model');

// let io;

// function initializeSocket(server) {
//     io = socketIo(server, {
//         cors: {
//             origin: '*',
//             methods: [ 'GET', 'POST' ]
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log(`Client connected: ${socket.id}`);


//         socket.on('join', async (data) => {
//             const { userId, userType } = data;

//             if (userType === 'user') {
//                 await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             } else if (userType === 'captain') {
//                 await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             }
//         });


//         socket.on('update-location-captain', async (data) => {
//             const { userId, location } = data;

//             if (!location || !location.ltd || !location.lng) {
//                 return socket.emit('error', { message: 'Invalid location data' });
//             }

//             await captainModel.findByIdAndUpdate(userId, {
//                 location: {
//                     ltd: location.ltd,
//                     lng: location.lng
//                 }
//             });
//         });

//         socket.on('disconnect', () => {
//             console.log(`Client disconnected: ${socket.id}`);
//         });
//     });
// }

// // const sendMessageToSocketId = (socketId, messageObject) => {

// // console.log("message object",messageObject);

// //     if (io) {
// //         io.to(socketId).emit(messageObject.event, messageObject.data);
// //     } else {
// //         console.log('Socket.io not initialized.');
// //     }
// // }
// const sendMessageToSocketId = (socketId, messageObject) => {
//     if (!socketId || !messageObject || !messageObject.event) {
//         console.error('❗ Invalid input to sendMessageToSocketId:', { socketId, messageObject });
//         return;
//     }

//     if (!io) {
//         console.error('❗ Socket.io not initialized.');
//         return;
//     }

//     io.to(socketId).emit(messageObject.event, messageObject.data);
//     console.log(`📤 Sent "${messageObject.event}" to socket ${socketId}`, messageObject.data);
// };


// module.exports = { initializeSocket,sendMessageToSocketId };

// const socketIo = require('socket.io');
// const userModel = require('./models/user.model');
// const captainModel = require('./models/captain.model');

// let io;

// function initializeSocket(server) {
//     io = socketIo(server, {
//         cors: {
//             origin: '*',
//             methods: ['GET', 'POST']
//         }
//     });

//     // io.on('connection', (socket) => {
//     //     console.log(`Client connected: ${socket.id}`);


//     //     socket.on('join', async (data) => {
//     //         const { userId, userType } = data;

//     //         if (userType === 'user') {
//     //             await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//     //         } else if (userType === 'captain') {
//     //             await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//     //         }
//     //     });

//     //     socket.on('update-location-captain', async (data) => {
//     //         const { userId, location } = data;

//     //         if (!location || !location.ltd || !location.lng) {
//     //             return socket.emit('error', { message: 'Invalid location data' });
//     //         }

//     //         await captainModel.findByIdAndUpdate(userId, {
//     //             location: {
//     //                 ltd: location.ltd,
//     //                 lng: location.lng
//     //             }
//     //         });
//     //     });

//     //     socket.on('disconnect', () => {
//     //         console.log(`Client disconnected: ${socket.id}`);
//     //     });
//     // });
//     io.on('connection', (socket) => {
//         console.log('👋 A new client is trying to connect...');

//         console.log(`✅ Client connected: ${socket.id}`);

//         socket.on('join', async (data) => {
//             console.log('📥 Join event received:', data); // <== Add this line
//             const { userId, userType } = data;
//             if (userType === 'user') {
//                 await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             } else if (userType === 'captain') {
//                 await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//             }
//         });

//         socket.on('update-location-captain', async (data) => {
//             const { userId, location } = data;

//             if (!location || !location.ltd || !location.lng) {
//                 return socket.emit('error', { message: 'Invalid location data' });
//             } 

//             await captainModel.findByIdAndUpdate(userId, {
//                 location: {
//                     ltd: location.ltd,
//                     lng: location.lng
//                 }
//             });
//         });
//         const sendMessageToSocketId = (socketId, messageObject) => {

//             console.log(messageObject);
            
//                 if (io) {
//                     io.to(socketId).emit(messageObject.event, messageObject.data);
//                 } else {
//                     console.log('Socket.io not initialized.');
//                 }
//             }
//         socket.on('disconnect', () => {
//             console.log(`❌ Client disconnected: ${socket.id}`);
//         });
//     });

// }


// module.exports = { initializeSocket,sendMessageToSocketId};


// // | 🧩 Part                   | 👦 First-Class Boy Explanation                             |
// // | ------------------------- | ---------------------------------------------------------- |
// // | `initializeSocket()`      | Sets up the real-time chatting system.                     |
// // | `connection`              | When someone opens the app, they connect.                  |
// // | `join`                    | User or captain says, "Hey it's me!" and we remember them. |
// // | `update-location-captain` | Captain sends their current map location.                  |
// // | `disconnect`              | We know if someone leaves.                                 |
// // | `sendMessageToSocketId()`.| We send messages to users/captains anytime.               |

const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle joining the socket
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User joining with userId: ${userId}, userType: ${userType}, socketId: ${socket.id}`);
            
            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User ${userId} connected with socketId: ${socket.id}`);
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Captain ${userId} connected with socketId: ${socket.id}`);
                } else {
                    console.log(`Invalid userType: ${userType}`);
                }
            } catch (error) {
                console.error(`Error updating user ${userId} socketId: ${error.message}`);
            }
        });

        // Handle location update for captain
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log(`Updating location for captain ${userId}:`, location);

            if (!location || !location.ltd || !location.lng) {
                console.error('❌ Invalid location data:', location);
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: { ltd: location.ltd, lng: location.lng }
                });
                console.log(`Captain ${userId} location updated to: ${location}`);
            } catch (error) {
                console.error(`Error updating location for captain ${userId}: ${error.message}`);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// Function to send message to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {
    if (!socketId || !messageObject || !messageObject.event) {
        console.error('❗ Invalid input to sendMessageToSocketId:', { socketId, messageObject });
        return;
    }

    if (!io) {
        console.error('❗ Socket.io not initialized.');
        return;
    }

    console.log(`📤 Preparing to send "${messageObject.event}" to socket ${socketId}`);

    try {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`📤 Sent "${messageObject.event}" to socket ${socketId}`, messageObject.data);
    } catch (error) {
        console.error(`❌ Error sending message to socket ${socketId}: ${error.message}`);
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };
