module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Downloads bower dependencies
        bower: {
            install: {

            }
        },

        // copy files from bower components
        bowercopy: {
            options: {
                clean: false
            },
            javascript: {
                options: {
                    destPrefix: 'src/Libs'
                },
                files: {
                    'jquery.js': 'jquery/dist/jquery.js',
                    'normalize.css': 'normalize.css/normalize.css'
                },
            }
        },

        // Concat js files
        concat: {
            options: {
                separator: ';',
            },
            distCommon: {
                src: ['src/Libs/jquery.js', 'src/js/game-core.js','src/js/game-init.js'],
                dest: 'src/public/js/scripts.js'
            }
        },

        // Validate files with JSHint.
        jshint: {
            beforeUglify: ['Gruntfile.js', 'src/js/*.js']
        },

        // Run unit tests.
       jasmine: {
           pivotal: {
               src: 'src/js/game-core.js',
               options: {
                   specs: 'src/test/Spec/game-core.spec.js',
                   summary: true,
                   junit: {
                       path: 'junit'
                   }
               }
           }
       },

        // Minify files with UglifyJS.
        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: 'sourceMap.map',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildCommon: {
                src: 'src/public/js/scripts.js',
                dest: 'src/public/js/scripts.min.js'
            }
        },

        // Concat CSS with @import statements at top and relative url preserved
        concat_css: {
            commonStyles: {
                src: ['src/Libs/*.css', 'src/css/*.css'],
                dest: 'src/public/css/styles.css'
            }
        },

        // Validate CSS
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/public/css/**/*.css']
            }
        },

        // Structural optimization of CSS files.
        csso: {
            dynamic_mappings: {
                expand: true,
                cwd: 'src/public/css',
                src: ['*.css', '!*.min.css'],
                dest: 'src/public/css',
                ext: '.min.css'
            }
        },

        // Clean files and folders.
        clean: {
            //temp: ['Temp', 'bower_components', 'junit', '_tests']
        },

    });

    grunt.registerTask('deploy', ['bowercopy', 'concat', 'jshint', 'uglify', 'jasmine', 'concat_css', 'csslint','csso']);
};
