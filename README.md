# WatchingWithFriends-TUFIQoE-2022

Chrome extension and Python/flask REST API for [ecologically valid](https://en.wikipedia.org/wiki/Ecological_validity) QoE experiment using Netflix streaming platform. 

Similiar to the [YourNetflixOurLab](https://github.com/navuyi/YourNetflixOurLab-TUFIQoE-2022.git). 

## Technology stack
Frontend (Chrome extension)
- Webpack
- React
- Typescript

Backend
- Python (Flask)
- Sqlite3

## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Go to /extension folder.
4. Run `npm install` to install the dependencies.
5. Run `npm run build`
6. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
7. Run backend:
    1. cd into `backend` directory
    2. run `python database/init.py` to initialize SQLite3 database
    3. Create virtual environment `python -m venv venv`
    4. Activate the python virtual environment by running OS compatible command
    5. Install requirements `pip install -r requirements.txt`
    6. On macOS run `source start-mac.sh` || on Windows `.\start-windows.bat`
8. Happy hacking.