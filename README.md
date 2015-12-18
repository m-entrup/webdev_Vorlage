## Zugriff auf einen Webserver per ``ssh``

Besitzt man Webspace bei Strato, dann kann man auf diesen auch per ``ssh`` zugreifen. Bei Linux-Servern ist diese zugriffs-Art so gut wie immer möglich. Man sollte ``ssh`` dem Zugriff per FTP vorziehen. Bei ``ssh`` ist die Verbindung grundsätzlich verschlüsselt, was bei FTP nicht der Fall ist. Außerdem kann ``rsync`` ``ssh`` nutzen und man profiziert somit vom viel schnelleren Upload per ``rsync``. Eine gute Einführung in die Nutzung von ``ssh`` bietet ein [LearnCode.academy Video].


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

## Wie wurde diese vorlage erstellt?

Der folgende Code-Block enthält alle ausgeführten Befehle. Fall nötig, dann werden diese kurz mit einem Kommentar erläutert. Ein Kommentar nach dem Befehl weißt auf die getätigten eingaben hin.

```bash
mkdir webdev_Vorlage
cd webdev_Vorlage
# Es wird vorrausgesetzt, dass git und node.js (inklusive npm) installiert sind
npm init
# Es wird eine Vielzahl von Parametern abgefragt.
# Welche Werte ich jeweils eigegeben habe, das ist in der Datei package.json zu sehen.
git init
git add .
```

[LearnCode.academy Video]: https://www.youtube.com/watch?v=DbPDraCYju8
