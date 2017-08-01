# plex-fhem-lightscenes
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Triggered by Plex Webhooks, this Script will change the LightScene status…


### Installation

#### Directly

You'll need [node.js](https://nodejs.org/en/) to run this.

```bash
git clone https://github.com/sebbo2002/plex-fhem-lightscenes.git
cd ./plex-fhem-lightscenes
npm install
npm start
```


#### Docker

You can also use the docker container to run this script:

```bash
docker run -p 8888 sebbo2002/plex-fhem-lightscenes
```


### Configuration

Use environment variables to setup the script:

<table>
    <tr>
        <th scope="row">PORT</td>
        <td>Port the service binds to</td>
        <td>Default: <i>8888</i></td>
    </tr>
    <tr>
        <th scope="row">URL</td>
        <td>FHEM URL</td>
        <td>Default: <i>http://fhem</i></td>
    </tr>
    <tr>
        <th scope="row">LIGHTSCENE</td>
        <td>Lightscene to change</td>
        <td>No default</td>
    </tr>
    <tr>
       <th scope="row">SCENE_PLAY_MOVIE</td>
       <td>Lightscene to use when a movie plays</td>
       <td>Default: <i>play</i></td>
    </tr>
    <tr>
       <th scope="row">SCENE_PLAY_SHOW</td>
       <td>Lightscene to use when a tv show plays</td>
       <td>Default: <i>play</i></td>
    </tr>
    <tr>
       <th scope="row">SCENE_PLAY_TRAILER</td>
       <td>Lightscene to use when a trailer plays</td>
       <td>Default: <i>play</i></td>
    </tr>
    <tr>
       <th scope="row">SCENE_PLAY</td>
       <td>Lightscene to use when something plays (can be overwritten by the ones above)</td>
       <td>Default: <i>play</i></td>
    </tr>
    <tr>
       <th scope="row">SCENE_PAUSE</td>
       <td>Lightscene to use when something pauses</td>
       <td>Default: <i>home</i></td>
    </tr>
    <tr>
       <th scope="row">SCENE_STOP</td>
       <td>Lightscene to use when something plays (can be overwritten by the ones above)</td>
       <td>Default: <i>home</i></td>
    </tr>
</table>