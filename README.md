# Car Assistant - Your intelligent car advisor
Car Assistant is a modern application created so that the driver can initially determine the possible cause of a car failure or error. The application is based on Next.js technology using modern libraries and good coding practices.

### Link to the application - https://car-assistant-lyart.vercel.app/

## Main Functions
- AI integration: Users can ask questions about car diagnostics and repairs. The system offers tips and advice.
- User profiles: User login and registration using NextAuth library (Auth.js).
- Database: postgreSQL with prisma ORM is responsible for storing data.
- Sending mails: using Resend to handle sending verification emails.
- Credits and payments: credit system for creating new reports and handling payments using Stripe.

## How to launch a project
1. Cloning the repository: ```git clone https://github.com/Stoooq/car-assistant.git```
2. Adding environment variables in .env file
3. Dependency installation: ```npm install```
4. Starting the development server: ```npm run dev```
