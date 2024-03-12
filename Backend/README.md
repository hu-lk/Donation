# README for "# mcc_profile_management_api" Backend

## Introduction:

This application uses Node.js v18.12.0 and Sequelize ORM to manage versions of data stored in a database.

## Prerequisites:

- Node.js v18.12.0 installed on your machine
- A SQL database (MySQL, PostgreSQL, SQLite, or MSSQL)
- Sequelize installed
- Using MySQL shell v8.0.31

## AWS EC2

- Start the API using "npm run start"
- Need to start manually after the instance has been stopped.

## Project Setup

### Installation:

1. Clone the repository to your local machine

Once you clone or download project go into you folder

2. copy **.env.local** file to **.env** file

3. Install dependencies by running `npm install`
4. Configure the database connection in `config/db.js` file
5. Run migrations to create tables in the database using `npx sequelize-cli db:migrate`

### Folder Structure

```
.
├── src/
│   ├── controllers/           # Controllers
│   ├── middlewares/           # Middlewares
│   ├── domainEntities/        # Express database models
|   ├── config/
|   ├── routes/                # Route definitions
├── .env                       # API keys, passwords, and other sensitive information
├── index.js                   # Express application
└── package.json               # NPM Dependencies and scripts
```

### API Routes:

1. AUTH APIs

- create profile

  POST | /api/v1/profile/register

  payload

```
     {
        "emailAddress": "rahul@gmail.com",
        "password": "1234567890aA&",
        "firstName": "Rahul",
        "lastName": "Raghunath",
        "profileType":"1"
}

```

- verifyEmail

  PUT | /api/v1/profile/verifyEmail/:token

  payload

----## user login

POST | /api/v1/profile/login

payload

```
  {
    "email":"sharvari.p@gmail.com",
    "password": password_in_string
  }
```

----## forgotPassword

POST | /api/v1/profile/forgotPassword

payload

```
  {
    "emailAddress":"rahul@gmail.com",
  }
```

----## forgotChangePassword

POST | /api/v1/profile/forgotChangePassword/:token

payload

```
  {
    "newPassword":"1234567890aA&change",
    "confirmPassword":"1234567890aA&change"
  }
```

2. address endpoints

----- Get enquiry address data

Populate the DB using the INSERT queries in the db folder

###

GET | /api/v1/profile/address/countries

###

GET | /api/v1/profile/address/83/states

###

GET | /api/v1/profile/address/83/48/cities

3. Profile endpoints

###

GET | /api/v1/profile/info/1001 -----returns the profile info ### has a rate limit of 1000 requests per minute
