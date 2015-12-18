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

  // Diese Aufgabe wird von flightplan aufgerufen.
  grunt.registerTask('prefly', []);
};
