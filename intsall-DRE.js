var Service = require('node-windows').Service;
var config = require('./config.json');

// pre-Installation 
/**
* npm install - g node- windows
* npm link node-windows
*/

// Create a new service object
var svc = new Service({
    name: 'DRE Node Server TEST',
    description: 'The new Node.js based DRE Server TEST',
    script: config.absoluteProgramDirectory,
    nodeOptions: [
        '--harmony'
    ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', () => {
    svc.start();
});

console.log('program sucessfully installed');

svc.install();