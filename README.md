# Blogify

- Blogify is a Node.js-based blogging application designed for creating, managing, and sharing blog content.
- It utilizes __Server-Side Rendering (SSR)__ with __EJS__ templates, enabling fast and efficient delivery of blog pages. 
- With features like file upload using __Multer__ and secure authentication with __JWT__, Blogify offers a seamless blogging experience while prioritizing security and performance.


## Features:

- __Server-Side Rendering (SSR):__ Blogify utilizes server-side rendering (SSR) with EJS templates, ensuring fast and efficient rendering of blog content. SSR enhances performance and improves SEO by serving fully rendered HTML pages to users.

- __File Upload with Multer:__ Multer, a middleware for handling file uploads in Node.js, is integrated into Blogify to facilitate easy uploading of images and other media files for blog posts. This feature enhances the visual appeal of blog content and enriches the user experience.

- __Authentication with JWT:__ User authentication in Blogify is implemented using JSON Web Tokens (JWT). JWT-based authentication provides secure access to user accounts and ensures seamless interaction with the application's features.

- __Encryption and Hashing:__ Blogify prioritizes the security of user data by employing encryption and hashing techniques using the crypto module in Node.js. This ensures that sensitive information, such as user passwords, is stored securely and protected from unauthorized access.




## Getting Started:

To run Blogify locally, follow these steps:

- Clone the repository: __git clone__ 
- Install dependencies: npm install
- Configure environment variables  in a .env file.
- Start the application: __npm__ start or __node index.js__
- Access Blogify in your web browser at http://localhost:8000
