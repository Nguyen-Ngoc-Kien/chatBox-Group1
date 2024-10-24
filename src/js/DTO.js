// DTO Definitions

// User DTO
class UserDTO {
    constructor(id, name, avatar, onlineStatus) {
        this.id = id; // Unique identifier for the user
        this.name = name; // User's name
        this.avatar = avatar; // URL to the user's avatar image
        this.onlineStatus = onlineStatus; // Online status message
    }
}

// Message DTO
class MessageDTO {
    constructor(id, senderId, content, timestamp, isImage = false, imageUrl = '') {
        this.id = id; // Unique identifier for the message
        this.senderId = senderId; // ID of the user who sent the message
        this.content = content; // Text content of the message
        this.timestamp = timestamp; // Time the message was sent
        this.isImage = isImage; // Boolean indicating if the message contains an image
        this.imageUrl = imageUrl; // URL to the image if it's an image message
    }
}

// Group DTO
class GroupDTO {
    constructor(id, name, description, isPrivate, members) {
        this.id = id; // Unique identifier for the group
        this.name = name; // Name of the group
        this.description = description; // Group description
        this.isPrivate = isPrivate; // Boolean indicating if the group is private
        this.members = members; // Array of user IDs in the group
    }
}

// Mock Data

// Users
const users = [
    new UserDTO(1, 'Bill Kuphal', 'https://i.pravatar.cc/40', 'Online for 10 mins'),
    new UserDTO(2, 'Photographers', 'https://i.pravatar.cc/41', 'Here’re my latest drone shots'),
    new UserDTO(3, 'Daryl Bogisch', 'https://i.pravatar.cc/42', 'Offline'),
];

// Messages
const messages = [
    new MessageDTO(1, 1, 'Who was that philosopher you shared with me recently?', '2024-10-24T09:41:00Z'),
    new MessageDTO(2, 2, 'That’s him! What was his vision statement?', '2024-10-24T09:42:00Z'),
    new MessageDTO(3, 1, 'Roland Barthes', '2024-10-24T09:43:00Z'),
    new MessageDTO(4, 2, 'Ultimately in order to see a photograph well, it is best to look away or close your eyes.', '2024-10-24T09:44:00Z'),
    new MessageDTO(5, 1, '', '2024-10-24T09:45:00Z', true, 'https://example.com/image.jpg'), // Example image message
];

// Groups
const groups = [
    new GroupDTO(1, 'Photography Enthusiasts', 'A group for those who love photography.', true, [1, 2]),
    new GroupDTO(2, 'Book Lovers', 'A group to discuss favorite books.', false, [1, 3]),
];

// Example function to log the mock data
function logMockData() {
    console.log('Users:', users);
    console.log('Messages:', messages);
    console.log('Groups:', groups);
}

// Call the function to log the mock data
logMockData();