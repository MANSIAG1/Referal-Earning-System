Referral Earning System

This is a full-stack web application I built that implements a multi-level referral system. It tracks purchases and distributes earnings automatically to users based on who referred them.

Features:

- It has a multi-level referral system that tracks direct and indirect referrals.
- Direct Referrals: You earn 5% of the profit if someone you referred makes a purchase.
- Indirect Referrals: You earn 1% of the profit if someone referred by your referral makes a purchase.
- I used JWT and bcrypt for secure signup and login.
- There are admin features to create products with specific profit margins.
- The dashboard updates your earnings in real-time.
- The UI is responsive and works well on mobile and desktop since I used React and TailwindCSS.

Prerequisites:

Before you start, make sure you have Node.js and npm installed on your machine.
You also need to have MongoDB running. You can either install it locally or use a cloud version like MongoDB Atlas.

Installation and Setup:

1. First, clone this repository to your computer.

2. Setting up the Backend (Server):
   Go into the server folder and run npm install to get all the dependencies.
   You need to create a .env file in the server folder.
   In that file, add your PORT (like 5000), your MONGO_URI (your database connection string), and a JWT_SECRET (any secret key for security).
   Once that is done, run npm start or node server.js to start the server.

3. Setting up the Frontend (Client):
   Go into the client folder and run npm install.
   Then run npm run dev to start the application.
   It should open up in your browser.

Folder Structure:

I organized this project with a client folder for the frontend and a server folder for the backend.
I think this is better because it completely separates the user interface code from the server logic.
This makes it easier to work on one side without breaking the other.
The backend follows a structure with models and routes, which keeps the code clean.
The frontend uses Vite, which makes the development server much faster than standard React apps.

Test Cases:

I included integration tests in the server/tests folder, specifically main.test.js.
I think these are better than simple unit tests because they simulate a real-world scenario.
The test creates User A, who refers User B, who refers User C. Then User C buys a product.
The test automatically checks if User B got their 5% and User A got their 1%.
This ensures the money logic is actually working with the database.
You can run these tests by going to the server folder and running node tests/main.test.js.
