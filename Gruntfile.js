var test_data = require('./test/example_data');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['templates/**/*.*'],
        tasks: ['development'],
        options: {
          spawn: false,
          livereload: false
        },
      },
    },

    http: {
      your_service: {
        options: {
          url: 'http://localhost:3000/generate/nodejs',
          method: 'POST',
          json: test_data
        },
        dest: 'grunt_respose.txt'
      }
    }
  });

  //watcher
  grunt.loadNpmTasks('grunt-contrib-watch');

  //http
  grunt.loadNpmTasks('grunt-http');

  // Default task(s).
  grunt.registerTask('development', ['http','watch']);


};