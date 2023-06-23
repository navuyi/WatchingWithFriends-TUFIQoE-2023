# WatchingWithFriends-TUFIQoE-2023

Chrome extension and Python/flask REST API for [ecologically valid](https://en.wikipedia.org/wiki/Ecological_validity) QoE experiment using Netflix streaming platform. 

Similiar to the [YourNetflixOurLab](https://github.com/navuyi/YourNetflixOurLab-TUFIQoE-2022.git). Migrated to Typescript. Includes modifications of Netflix's Cadmium Playercore script:
- changing buffer size
- enabling bitrate menu allowing manipulations of video (and audio) quality.

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
   1. Make venv env `python3 -m venv venv`
   2. Install requirements `pip install -r requirements.txt` or on macOS `sh make-mac.sh`
   3. On macOS run `sh make-mac.sh` || on Windows `.\start-windows.bat`
8. Happy hacking.
