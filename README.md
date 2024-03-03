# UWinCare


# Application Screenshots:
![image](https://github.com/badri119/UWinCare/assets/90651004/b78a7975-8aee-4b7a-b30d-05d821c61806)




# Complete Flow of the Application:

- Our Application would start from Sign In page, However if the user is new the user can decide to click the sign up button to register a new account
- Or else User can also select Guest Login button from Sign Up page
- After successful authentication, User will be redirected to Home page, which is posts list page in our project
- From here, User can navigate via bottom menu of the screen
- We have following buttons in bottom menu:
  - Home
  - Articles
  - Create a Post
  - Experts
  - Post
- Clicking Plus button in bottom will open post create page. However, we will only allow logged in user to create a post
- On Articles List Page also have a detail page which will be navigated to if clicked on any article
- We also have a expert Profile Page, which will be navigated if any expert is clicked
- From Profile Page we can Logout of application by clicking on top right exit button


# Admin Guide Flow:
![image](https://github.com/badri119/UWinCare/assets/90651004/30a82162-ed39-4705-940b-517709d06a82)

![image](https://github.com/badri119/UWinCare/assets/90651004/2f6a82b9-ea81-45d5-b06a-79e81e6891ae)

# Complete Flow of Super Admin panel

- Go to this URL : http://3.109.214.224/admin/
- You will see ”LOGIN PAGE” for Django super admin panel
- Login into the site using credentials:
  • email: admin@uwincare.com
  • password: test1234
- From here, User can navigate via bottom menu of the screen
- You will be redirected to home page after successful authentication
- Click on Articles Link or any section to manage
- You will be redirected to ”ARTICLES MANAGEMENT PAGE”
- Select any article to edit/delete/update or Create new from top right
- You will be redirected to ”EDIT ARTICLE PAGE”
- After making required changes in form, Hit save to create/update Article
- to logout, click on top right button with logout text link to logout. The


# Deployment Setup Guide:

Create a New AWS ubuntu Instance from AWS console
After login into the system. Execute the following commands

1. sudo apt-get update
2. sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresqlcontrib
nginx
3. sudo -u postgres psql
4. sudo -H pip install –upgrade pip
5. sudo -H pip install virtualenv
6. mkdir /uwincare
7. cd /uwincare/
8. ls
9. git clone https://nischay-dhiman@github.com/nischay-dhiman/UwinCare-
Backend.git
10. cd UwinCare-Backend/
11. ls
12. virtualenv Uwincare-Backendenv
13. source Uwincare-Backendenv/bin/activate
14. pip install django gunicorn psycopg2
15. ls
16. git status
17. git stash
18. git fetch –all
19. git checkout develop
20. nano Uwincare/settings.py
21. pip install djangorestframework
22. pip install markdown
23. pip install django-filter
24. pip install django-cors-headers
25. pip install Pillow
26. python manage.py makemigrations
27. python manage.py migrate
28. python manage.py createsuperuser
29. python manage.py collectstatic
30. python manage.py runserver 0.0.0.0:8000
31. PYTHONPATH=‘pwd‘/uwincare/UwinCare-Backend gunicorn –bind
0.0.0.0:8000 Uwincare.wsgi:application
32. deactivate
33. sudo nano /etc/systemd/system/gunicorn.service
34. sudo systemctl daemon-reload
35. sudo systemctl restart gunicorn
36. systemctl status gunicorn.service
37. sudo nano /etc/nginx/sites-available/uwincare
38. sudo nano /etc/nginx/sites-available/uwincare
39. sudo ln -s /etc/nginx/sites-available/uwincare /etc/nginx/sites-enabled
40. sudo nginx -t
41. sudo systemctl restart nginx
42. TO FETCH LATEST CODE AND RESTARTING SERVER
43. git status
44. git stash
45. git fetch –all
46. git checkout check-branch
47. git stash pop
48. source Uwincare-Backendenv/bin/activate
49. python manage.py makemigrations
50. python manage.py migrate
51. exit
52. cd /home//ubuntu/uwincare/
53. cd UwinCare-Backend/
54. ls
55. sudo systemctl restart gunicorn
