## Tag 0.1
1. Initialize the project.
```
$ mkdir auth-server
$ cd auth-server
$ npm init -y
```

2. Install typescript dependencies.
```
$ npm install --save-dev typescript
$ npm install --save-dev tslint
```

3. Install express.
```
$ npm install --save express
$ npm install --save-dev @types/express
```

4. Create tsconfig.json in the root of the project. Configure the tsconfig as per your needs.
```
$ npx tsc --init
```

5. Configure tslint
```
$ npx tslint --init
```

6. Add start script to package.json. Also change the main to `dist/app.js`
```
tsc && node dist/app.js
```

7. Create a basic express server to test.
8. Start server using `npm start`.

## Tag 0.2

9. Add middleware to get request data using body-parser.
```
$ npm install --save body-parser
```

10. Setup the sign up router in `router/user.ts`.

11. Install `bcrypt` for hashing of password.
```
$ npm install --save bcrypt
$ npm install --save-dev @types/bcrypt
```

12. Setup a basic flow for user registeration. Will deal with storing in MongoDb later.

13. Setup an empty login flow as well.

## Tag 0.3

14. Install mongoose.
```
$ npm install --save mongoose
$ npm install --save-dev @types/mongoose
```

15. Create user model in `model/user.ts`