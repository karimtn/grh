module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n <%= pkg.name %> - v <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>\n'+
    ' Edited by <%= pkg.author.name %> - <%= pkg.author.email %> \n*/\n',
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'assets/**/*.js','!assets/vendor/**']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      production: {
          src: ['assets/js/*.js','assets/js/controllers/*.js','assets/js/components/data/*.js','!assets/vendor/**'],
          dest: 'dist/js/script.min.js'
            
        //files: { 'dist/js/script.min.js': 'assets/**/*.js','!assets/vendor/**'}
      }
    },

    // Configure the less compilation for both dev and prod -------------------
 
    less: {
      dev: {
        files: {
          "dist/css/style.css": 'assets/css/base.less'
        }
      },
      production: {
        options: {
          // minify css in prod mode
          cleancss: true,
        },
        files: {
          "dist/css/style.css": 'assets/css/base.less'
        }
      }
    },
          // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      production: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    },
    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['assets/**/*.css', 'assets/**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: 'assets/**/*.js',
        tasks: ['jshint']
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  //grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);
  // this task will only run the dev configuration
  grunt.registerTask('dev', ['jshint', 'less:dev']);

  // only run production configuration
  grunt.registerTask('production', ['jshint', 'uglify:production', 'less:production','cssmin:production']);


};
