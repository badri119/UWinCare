# UwinCare-Backend

## Setting up PostGre
1. Download and install PostGre SQL
2. Add psql.exe to path variables
3. Open terminal and write <br>
    `psql -U postgres`
4. Enter the password you entered during installation.
5. Then enter the command <br>
    `create database uwincare;`

## Setting up Django

1. Download and install python on your local machine
2. Then Confirm whether python is added to your path by typing 'python' in your console
3. if Python is added to PATH then run the following commands in console <br>
    `pip install django` <br>
    `pip install psycopg2`
4. Then after installing django framework, open console in the project directory, run
    `python manage.py runserver`
5. Now open [127.0.0.1:8000](127.0.0.1:8000) in your web browser.
