// https://www.npmjs.com/package/flightplan
// https://github.com/pstadler/flightplan
var plan = require('flightplan');

//Konfiguration
plan.target('publish', {
  // Mein Webspace ist bei Strato, weshalb ich diese URL für ssh nutzen muss
  host: 'ssh.strato.de',
  // Bei Strato ist die Domain der Nutzername
  username: 'm-entrup.de',
  agent: process.env.SSH_AUTH_SOCK
});

// Hat man mehrere Domains, dann sind die Dateien zu diesen sehr wahrscheinlich in Unterordnern
var remoteDir = 'bootstrap/m-entrup/'
// var remoteDir = 'example-com-' + new Date().getTime();

// Die folgenden Befehle werden in der angegebenen Reihenfolge ausgeführt.
// Man kann weitere Aufrufe von plan.remote() und plan.local() hinzufügen.

// Befehle, welche auf dem Server ausgeführt werden
plan.remote(function(remote) {
  remote.log('Create folder to copy files to');
  remote.exec('mkdir -p ' + remoteDir);
});

// Befehle, welche lokal ausgeführt werden
plan.local(function(local) {
  local.log('Run build');
  local.exec('grunt prefly');
  local.log('Copy files to remote host');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, remoteDir);
});
