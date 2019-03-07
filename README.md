This project was bootstrapped with [Laravel app](https://laravel.com/docs/5.8/installation).

## Requirements

-----------------------------------

We're using laravel application APIs, So first we need to start the laravel application and currently, we're using the default laravel app url as http://location:8000.
- Start the laravel application by using `php artisan serve`
- Install the npm dependency of vue app using `npm install`
- Start the vue application by using `npm run dev`

## About

--------------------------------------

As per the requirements shared the following things have been implemented:

### Consumed Laravel APIs
We're using following APIs of laravel application -

For showing the Category details with tasks
- GET|HEAD | localhost:8000/todo

For CRUD operation on categories
- GET|HEAD | localhost:8000/api/categories - (can pass the parameters for pagination i.e page and per_page)
- POST     | localhost:8000/api/categories
- PUT      | localhost:8000/api/categories/{id}
- DELETE   | localhost:8000/api/categories/{id}

For CRUD operation on tasks
- GET|HEAD | localhost:8000/api/category/{id}/tasks
- POST     | localhost:8000/api/category/{id}/tasks
- PUT      | localhost:8000/api/category/{categoryId}/tasks/{taskId}
- DELETE   | localhost:8000/api/category/{categoryId}/tasks/{id}



### List of Components
--------------------------------------

- Navbar
- Topbar
- Categories
- Task
- Circular-Progress
- Confirm-Box
- Dialog
- IconButton
- Snackbar


## Improvements
--------------------------------------

The above components were implemented based on the requirements shared and keeping in mind the time constaints. However there may be certain improvements done to make it even robust and user friendly, which are:

- We can add pagination for task list too.
- We can add the row selection dropdown for page. (currently, we're displaying 10 rows on each page)