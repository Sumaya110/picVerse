# Feature List PicVerse – A universe of pictures and social sharing

## User Authentication & Profile Management

- User Registration: Sign up using email/password

- User Login: Authenticate using email/password

- Profile Management:

    - Edit username, profile picture, and bio.

    - View own and others' public profiles.

- Account Security:

    - JWT-based authentication for secure access.

    - Logout functionality.

##  Image Upload & Management

- Upload Images:
    - Users can upload images
    - Images exceeding 20MB are compressed for preview.

- Image Privacy: Mark images as private (visible only to the user) or public (visible to others).

- Image Storage: Store full-resolution images in public folder. Generate compressed versions for display.

- Image Download: Users can download the original full-resolution image (if have access).

## User Engagement & Rating System

- Like (Love) Feature:

- Users can like/unlike public images. Likes contribute to the engagement score.

- Image Views: Track how many times an image is opened.

- User Rating Calculation: Based on the number of images uploaded and engagement (likes, views, shares). Higher engagement increases user rating.

## Social Interaction & Sharing

- Search Users: Users can search for other users by username

- Share Images: Users can share both public and private images with other users.

- A shared image automatically creates a private chat between sender and receiver.

- Real-time Chat: Users can send text messages along with shared images. WebSockets (Socket.io) for real-time messaging.

## Feed & Profile Viewing

- Profile Pages:

    - Users can view their own profile (private + public images).

    - Visiting another user's profile shows only public images.

## Image Optimization & Performance

- Image Compression:

- Any image above 20MB is compressed for display.

- The original high-resolution image is stored for downloads.


## Notifications

- User Notifications:

    - Notify users when their images are liked/shared.

    - Notify users of new chat messages.

