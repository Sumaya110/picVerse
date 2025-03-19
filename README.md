# Feature List PicVerse – A universe of pictures and social sharing

## User Authentication & Profile Management

- User Registration: Sign up using email/password

- User Login: Authenticate using email/password

- Profile Management:

    - Edit username, profile picture, and bio.

    - View own and others' public profiles.

- Account Security: JWT-based authentication for secure access.

- Logout functionality.

##  Image Upload & Management

- Upload Images:
    - Users can upload images
    - Images exceeding 1MB are compressed for preview. Compressed to 200kb-300kb.

- Image Privacy: Mark images as private (visible only to the user) or public (visible to others).

- Image Storage: Store full-resolution images in public folder. Generate compressed versions for display.

- Image Download: Users can download the original full-resolution image (if have access).

## User Engagement & Rating System (Rating is optinal)

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

    - Visiting another user's profile shows only public images & share with you pictures

## Image Optimization & Performance

- Image Compression:

- Any image above 20MB is compressed for display.

- The original high-resolution image is stored for downloads.


## Notifications

- User Notifications:

    - Notify users when their images are liked/shared.

    - Notify users of new chat messages. (chat is optional)



# API endpoints

## 1. User Register


*Endpoint:*

```
  Method: POST
  Type: RAW
  URL: http://localhost:3000/api/auth/signup
```

*Body:*

```
{
    "username": "jahan",
    "email": "jahan@gmail.com",
    "password": "pass1234"
}

```

#### Example Response: success
```
{
    "status": 201,
    "data": {
        "id": "35553e59-b216-4375-8eb5-5b82c07fc9d5",
        "username": "sumaya",
        "email": "sumaya@gmail.com",
        "password": "$2b$10$aKwhP.wzoA3K0KkN1gPphezB6iVD5KCTtpDTtRdfH83MZbEctqIzK",
        "profilePic": null,
        "bio": null,
        "createdAt": "2025-03-19T07:52:51.317Z",
        "rating": 0
    },
    "msg": "User created"
}

```

#### Status Code: 
``` 
201 Created
```


## 2. User Login

*Endpoint:*

```
  Method: POST
  Type: RAW
  URL: http://localhost:3000/api/auth/login
```

*Body:*

```
{
    "email": "jahan@gmail.com",
    "password": "pass1234"
}

```

#### Example Response: success
```
{
    "message": "Login successful",
    "token": "eyJh......."
}

```

#### Status Code: 
``` 
200 OK
```




## 3. Get All Users

*Endpoint:*

```
  Method: GET
  URL: http://localhost:3000/api/users/
```


#### Example Response: success
```
{
    "status": "success",
    "data": [
        {
            "id": "b63bf299-3ddf-4b84-9968-7331acea6d52",
            "username": "sumayaJahan",
            "email": "jahan@gmail.com",
            "bio": "sumayaJahan's bio",
            "profilePic": null
        },
        {
            "id": "35553e59-b216-4375-8eb5-5b82c07fc9d5",
            "username": "sumaya",
            "email": "sumaya@gmail.com",
            "bio": null,
            "profilePic": null
        }
    ]
}

```

#### Status Code: 
``` 
200 OK
```





## 4. Get single User

*Endpoint:*

```
  Method: GET
  URL: http://localhost:3000/api/users/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Example Response: success
```
{
    "status": 200,
    "data": {
        "id": "b63bf299-3ddf-4b84-9968-7331acea6d52",
        "username": "sumayaJahan",
        "email": "jahan@gmail.com",
        "password": "$2b$10$w7eJ22s.HxW5aS0fUAqXI.cB/HQgM2O1jMpKdWj6zwksZngujf75i",
        "profilePic": null,
        "bio": "sumayaJahan's bio",
        "createdAt": "2025-03-19T04:17:11.748Z",
        "rating": 0
    }
}

```

#### Status Code: 
``` 
200 OK
```


## 6. Update a User

*Endpoint:*

```
  Method: PUT
  Type: RAW
  URL: http://localhost:3000/api/users/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


*Body:*

```
{
    "username": "sumayaJahan",
    "email": "jahan@gmail.com",
    "bio": "sumayaJahan's bio"
}

```

#### Example Response: success
```
{
    "status": 200,
    "message": "User updated successfully"
}

```

#### Status Code: 
``` 
200 OK
```


{
    "status": 200,
    "msg": "User deleted successfully"
}


