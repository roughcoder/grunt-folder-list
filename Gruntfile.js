/*
 * grunt-folder-list
 * https://github.com/roughcoder/grunt-folder-list
 *
 * Copyright (c) 2014 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
            jshint: {
                all: [
                    'Gruntfile.js',
                    'tasks/*.js',
                    '<%= nodeunit.tests %>',
                ],
                options: {
                    jshintrc: '.jshintrc',
                },
            },

            // Before generating any new files, remove any previously-created files.
            clean: {
                tests: ['tmp'],
            },

            // Configuration to be run (and then tested).
            folder_list: {

                default_options: {
                    options: {
                    },
                    files: [
                        {
                            src: ['**'],
                            dest: 'tmp/default_options.json',
                            cwd: 'test/fixtures/'
                        },
                        {
                            src: ['**'],
                            dest: 'tmp/default_options.yml',
                            cwd: 'test/fixtures/'
                        }
                    ]
                },

                custom_files_options: {
                    options: {
                        files: false
                    },
                    files: [
                        {
                            src: ['**'],
                            dest: 'tmp/custom_files_options.json',
                            cwd: 'test/fixtures/'
                        },
                        {
                            src: ['**'],
                            dest: 'tmp/custom_files_options.yml',
                            cwd: 'test/fixtures/'
                        }
                    ]
                },

                custom_folders_options: {
                    options: {
                        folders: false
                    },
                    files: [
                        {
                            src: ['**'],
                            dest: 'tmp/custom_folders_options.json',
                            cwd: 'test/fixtures/'
                        },
                        {
                            src: ['**'],
                            dest: 'tmp/custom_folders_options.yml',
                            cwd: 'test/fixtures/'
                        }
                    ]
                },
            },

            // Unit tests.
            nodeunit: {
                tests: ['test/*_test.js'],
            },

        }
    )
    ;

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'folder_list', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

}
;
