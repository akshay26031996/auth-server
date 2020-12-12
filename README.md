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