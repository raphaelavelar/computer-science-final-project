#!/bin/bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

cd ../frontend
npm install -g @angular/cli@18.2.1
npm install
ng serve