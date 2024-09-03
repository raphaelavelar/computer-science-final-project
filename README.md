# Computer science final project

## Environment  setup
### Requirements
1. Node v20.16.0
2. NPM v10.8.2
3. Angular v18.2.1
4. Python v3.12.1

### Installation
1. Frotend
Install angular and the required dependencies.
```
npm install -g @angular/cli@18.2.1
```
```
npm install
```

Start the application
```
ng serve
```

2. Backend
Install the required dependencies.
```
pip install -r requirements.txt
```

Execute the migrations
```
python manage.py migrate
```

Start the server
```
python manage.py runserver
```