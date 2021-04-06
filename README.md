# Todo List 



> Todo List built with the MEAN (MongoDB, Express, Angular & Node.js) stack. 



<img src="https://github.com/henrylong719/todolist-Angular/blob/main/images/todolist-dassshboard.png" alt="todolist-dassshboard" style="zoom:50%;" />



### Install Dependencies (frontend & backend)

```javascript
npm install
cd frontend
npm install
```



### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data (please intall mongoDB in your local machine)



```bash

# Import data
npm run data:import

# Destroy data
npm run data:destroy

```



```javascript

Sample User Logins

admin@example.com (Admin)
123456

john@example.com (User)
123456

jae@example.com (User)
123456

```



### Run

```bash
# Run frontend (:4200) & backend (:5000)
npm run dev

# Run backend only
npm run server
```



## Build & Deploy



```bash
# Create frontend prod build
cd frontend

ng build --prod
```

