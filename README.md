# Habrewken Stream Front

## Brighton Fighting Game Community Stream Tool
### React Frontend

The stream tool allows us to control and manage overlays (e.g scoreboard/camera) and text displayed on those overlays in real time (websockets) and from anywhere (webserver). It can also manage defined commands for [nightbot](https://nightbot.tv/).

This is the client, which connects to the server ([coldlink/hbk-stream-server](https://github.com/coldlink/hbk-stream-server)) to connect to, syncronise, and publish data, all using websockets.

## Setup
### Technology
- [Parcel](https://parceljs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Socket.io](https://socket.io/)

### Development

Setting the client up for development is straightforward, be sure to set up the [server](https://github.com/coldlink/hbk-stream-server) first though!
1. Clone the repo
```sh
# using ssh
$ git clone git@github.com:coldlink/hbk-stream-front.git
## or using https
$ git clone https://github.com/coldlink/hbk-stream-front.git
```
2. Open the folder
```sh
$ cd hbk-stream-dront
```
3. Install Dependencies
```sh
# using yarn (recommened)
$ yarn
# or npm
$ npm install
```
4. Set up environment variables
```sh
# create .env file by copying the .env.example
$ cp .env.example .env
# then add the STREAM_SERVER parameter
# by default the local server runs at "http://localhost:3000" but you can also put in a remote server.
```
5. Start the dev environment
```sh
$ yarn dev # or npm run dev

# if everything has worked correctly you should see something like
[18:25:40] Starting compilation in watch mode...

Server running at http://localhost:1234 
✨  Built in 3.67s.
```
6. Start development, the local dev server runs by default on `http://localhost:1234`.

### Deployment
We use [Parcel](https://parceljs.org/) as our build tool, so referring to there for the build process is helpful!

You can create a production build by running
```sh
$ yarn build
```
This creates a static production build in the `dist` folder, which you can then deploy on any static site.

We use [CapRover](https://caprover.com/) as the platform we run on, so the scripts in `package.json` are setup for that, but you can deploy to anywhere.
To deploy to CapRover, it's as sinple as running `yarn deploy` if you have a CapRover server setup.

## Development Tips
### Entry Files
The `index.html` in the `./src` folder is the entry pointed used by parcel. This calls `index.tsx` which sets up the React SPA. For global styles use the `index.css`, but this should rarely need to be changed, since nearly everything should be done with local styles.

### Theme
The `./src/theme` folder has the definition of any styles that can be reused, simply import the `theme` object, and use with the `styles` object and `withStyles` to attach it to the `classes` prop.

### UI
The `./src/ui` folder contains everything related to the react application. `App` is where the routes are defined, so if you're adding a new page, be sure to route it here. `Components` has reusuable components, used in multiple roots, or multiple places. `Routes` has the pages to be displayed, and everything related to that. `Services` has reusable services used by multiple routes, in our case `socket`.

## Contributing and Further Help
If you feel confident, then please contribute any improvements or features that you think would be good! Raise a PR and we can discuss. If I think of anything that needs to be worked on, I'll leave them in Issues.

If you encounter any problems setting up, feel free to leave an issue, or contact me directly!