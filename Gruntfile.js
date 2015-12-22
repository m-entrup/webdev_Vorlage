/* global module, require */

module.exports = function(grunt) {
  "use strict";
  // https://www.npmjs.com/package/grunt-contrib-jshint
  grunt.loadNpmTasks("grunt-contrib-jshint");
  // https://www.npmjs.com/package/grunt-contrib-watch
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Konfiguration der Aufgaben:
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
        reporter: require("jshint-stylish"),
      },
      all: ["Gruntfile.js", "flightplan.js", "js/*.js"],
    },

    watch: {
      scripts: {
        files: ["Gruntfile.js", "flightplan.js", "js/*.js"],
        tasks: ["jshint"],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Diese Aufgabe wird beim Aufruf ohne Parameter ausgeführt.
  grunt.registerTask("default", ["jshint", "watch"]);

  // Diese Aufgabe wird von flightplan aufgerufen.
  grunt.registerTask("prefly", []);
};
