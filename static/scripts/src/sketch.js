//Add all p5 specific draw, setup functions and canvas here.

const OSC = require('osc-js')
const path = require('path');
const p5Spring = require(path.resolve( __dirname, "./scripts/src/spring.js" ))

const osc = new OSC({
    discardLateMessages: false, /* ignores messages which timetags lie in the past */
    plugin: new OSC.WebsocketServerPlugin() /* used plugin for network communication */
});
osc.open({ port: 2211 });

let result = {}
osc.on('/test', message => {
    result = JSON.parse(message.args)
    console.log(result)
});



const string_len = window.screen.width - 20;

// Mass, String constant, Damping
let thin_string = new p5Spring.PString(string_len, 0.1, 0.2, 0.8);
let mid_string = new p5Spring.PString(string_len, 0.2, 0.2, 0.85);
let bass_string = new p5Spring.PString(string_len, 0.3, 0.2, 0.9);


let counter = 0;

function setup () {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    canvas.parent('p5Can');


    
    rectMode(CORNERS);
    noStroke();
    left = width / 2 - 100;
    right = width / 2 + 100;

    thin_string.pull(100);
    bass_string.pull(100);
    mid_string.pull(100);
}

function draw() {
    background(0);

    thin_string.update();
    thin_string.draw(20, 200);

    mid_string.update();
    mid_string.draw(20, 400);

    bass_string.update();
    bass_string.draw(20, 600);
    counter++;
    if (counter == 100){
        counter = 0;
        thin_string.pull(100);
        mid_string.pull(100);
        bass_string.pull(100);
    }
}
