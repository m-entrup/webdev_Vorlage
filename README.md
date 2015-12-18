## Zugriff auf einen Webserver per ``ssh``

Besitzt man Webspace bei Strato, dann kann man auf diesen auch per ``ssh`` zugreifen. Bei Linux-Servern ist diese Zugriffs-Art so gut wie immer möglich. Man sollte ``ssh`` dem Zugriff per FTP vorziehen. Bei ``ssh`` ist die Verbindung grundsätzlich verschlüsselt, was bei FTP nicht der Fall ist. Außerdem kann ``rsync`` ``ssh`` nutzen und man profitiert somit vom viel schnelleren Upload per ``rsync``. Eine gute Einführung in die Nutzung von ``ssh`` bietet ein [LearnCode.academy Video].


```bash
# Am eigenen Unix-PC
cd ~/.ssh
# Die E-Mail hilft beim Zuordnen der Keys, wenn mehrere auf dem Server hinterlegt sind.
ssh-keygen -C "my@email.com"
# Man kann den Dateinamen beliebig wählen und ein Passwort vergeben.

# Per ssh kann man den öffentlichen Key kopieren
scp id_rsa.pub domain@ssh.strato.de

# Ein letztes Mal ein Passwot für ssh verwenden
ssh domain@mssh.strato.de
# Den Ordner .ssh erstellen, falls er noch nicht existiert
mkdir .ssh
# Den öffentlichen Key in authorized_keys einfügen
cat id_rsa.pub >> .ssh/authorized_keys

# Jetzt kann man den Server verlassen und sich beim nächsten mal ohne Passwort anmelden
```

## Wie wurde diese Vorlage erstellt?

Der folgende Code-Block enthält alle ausgeführten Befehle. Fall nötig, dann werden diese kurz mit einem Kommentar erläutert. Ein Kommentar nach dem Befehl weißt auf die getätigten eingaben hin.

```bash
# Es wird vorausgesetzt, dass git und node.js (inklusive npm und grunt-cli) installiert sind

mkdir webdev_Vorlage
cd webdev_Vorlage

npm init
# Es wird eine Vielzahl von Parametern abgefragt.
# Welche Werte ich jeweils eingegeben habe, das ist in der Datei package.json zu sehen.

git init
git add .
git commit -m "Initialer Commit."
git remote add origin git@github.com:m-entrup/webdev_Vorlage.git
git push -u origin master

npm install grunt -S
touch Gruntfile.js
# Der Inhalt der Datei ist weiter unten aufgeführt (Version 1).

# Wir möchten nicht, dass node_modules ins Git-Repository aufgenommen wird.
touch .gitignore
echo "node_modules/" >> .gitignore

git add .
git commit -m "Hinzufügen von Grunt."

# JavaScript auf Fehler überprüfen
npm install grunt-contrib-jshint -S
# Aufgaben beim Spechern von Dateien ausführen.
npm install grunt-contrib-watch -S
# Gruntfile.js muss muss erweitert werden (siehe Version 2).

git add .
git commit -m "Hinzufügen von jshint und grunt-watch."

# Als nächstes wird flightplan eingerichtet:
# Mit 'npm install -g flightplan' installiert man es global.
npm install flightplan -S
touch flightplan.js
# Der Inhalt der Datei ist weiter unten aufgeführt

git add .
git commit -m "Hinzufügen von flightplan."
```

### Grunt.js

#### Version 1
```JavaScript
module.exports = function(grunt) {
  // Diese Aufgabe wird beim Aufruf ohne Parameter ausgeführt.
  grunt.registerTask('default', []);
};
```

#### Version 2
```JavaScript
module.exports = function(grunt) {
  // https://www.npmjs.com/package/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // https://www.npmjs.com/package/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Konfiguration der Aufgaben:
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js']
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Diese Aufgabe wird beim Aufruf ohne Parameter ausgeführt.
  grunt.registerTask('default', ['jshint', 'watch']);
};
```

### flightplan.js

```JavaScript
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
```

[LearnCode.academy Video]: https://www.youtube.com/watch?v=DbPDraCYju8
