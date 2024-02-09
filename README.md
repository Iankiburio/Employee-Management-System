# Employee-Management-System Database Creation and Initilization

## Introduction
* This documentation provides step-by-step instructions for setting up and running a our Employee Management System application, including database initialization and the rendering of the app. You can follow the below instructions/steps to configure your environment, initialize the database, and launch the application successfully.

## Requirements
## Installations and Running the Project

* Python (3.6 or later)
* pip (Python package installer)

## Setup Instructions
* Clone the Repository
 # To clone type the below commands.

* git clone <repository_url>
* cd <repository_directory>

## Set Environment Variables
* Set the necessary environment variables for Flask and React to enable the Application to run successfully. Type following commands in your terminal:

## For backend server
1. Cd into the backend directory
2. Run **pipenv install && pipenv shell**
3. Run app.py


## For frontend server
1. Cd into the frontend directory
2. Run npm install
3. Run npm start
3. Initialize the Database

## Flask Initilization
# Initialize the database using Flask-Migrate.

* flask db init
* This command initializes and creates a migration folder which is visible on the your projects' directory.

## How to Migrate the Database Tables.

* flask db migrate
* flask db upgrade

## Install Dependencies
* Install the required Python dependencies using the following command:

* pip install -r requirements.txt

## Run the Flask Application
* Start the Flask application using the following command:
* python app.py or python3 app.py depending on the type of python you have installed.

## Accessing the Application
* After running the app you can navigate to the website by following this url  http://localhost:5000 or any other port you have specified.

## Development
* In development mode you will be able to test your code and see if there are any errors or it's running smoothly.

## Conclusion
* If you follow the above steps you will have successfully created, set up, initialized the DB and run your flask application.
