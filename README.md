# To run via test:
1st terminal : mkdir db mongod --dbpath=./db
2nd terminal : npm test



# model/image:
To run via command line:

1. start the database mkdir db mongod --dbpath=./db

2. start server in a 2nd terminal nodemon server.js

3. make a POST to create a new Image, in a 3rd terminal : http $ echo '{"path":"<relative-path-to-image>", "name":"<name-of-image>"}' | http POST localhost:3000/api/1.0/image

This returns an id

4. make a POST to upload the image file
http -f POST localhost:3000/api/1.0/image/<_id> name='image' photo@<absolute_path_to_file>
