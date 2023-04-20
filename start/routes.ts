/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ auth, view }) => {
  return view.render('welcome')
})//.middleware('auth')


Route.get('/auth/google', 'AuthController.redirectToGoogle')
Route.get('/auth/google/callback', 'AuthController.handleGoogleCallback')
Route.get('/auth/logout', 'AuthController.logout')

Route.group(() => {
  Route.get('/rooms/create', 'RoomsController.create')
  Route.post('/rooms/create', 'RoomsController.store').middleware('validateRoomCreation')
}).middleware('auth')
