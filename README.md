PREFACE
This app is deployed; however, given the nature of my authentication method, it will NOT work as expected if tested using the provided URLs. User-specific information is only retrieved if the session username matches the cookie username, but I cannot establish session cookies with Render without paying for another domain name. Therefore, it is recommended running this app locally.

Attempting to log in with the seeded users will not work, as their passwords are not hashed properly in the database. Create a new user and navigate the site accordingly.

Startup
Start up a docker postgresql database, and add a database with name "db" to it.

Run 'npx knex migrate:latest | npx knex seed:run' while in the server directory (./server)

'npm install' and 'npm start' inside the server directory, and again inside the ui directory

The app should now be visible via Chrome and should operate as expected.
