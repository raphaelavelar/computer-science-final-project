# Computer science final project
## Requirements
1. Node v20.16.0
2. NPM v10.8.2
3. Angular v18.2.1
4. Python v3.12.1

## Environment  setup
### Automatic setup
As an alternative, it is possible to use a script to setup the environment instead of manually executing the process.  
```bash
bash scripts/setup-environment.sh
```
Note that, by using it, the backend is served as a headless service and it will require the process id (PID) to stop it.

```bash
ps aux | grep "python manage.py runserver"
```

### Frontend
Install Angular and the required dependencies.
```bash
npm install -g @angular/cli@18.2.1
```
```bash
npm install
```

Start the application
```bash
ng serve
```

### Backend
Install the required dependencies.
```bash
pip install -r requirements.txt
```

Execute the migrations
```bash
python manage.py migrate
```

Start the server
```bash
python manage.py runserver
```