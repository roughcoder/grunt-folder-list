/*
 * grunt-folder-list
 * https://github.com/roughcoder/grunt-folder-list
 *
 * Copyright (c) 2014 Neil Barton
 * Licensed under the MIT license.
 */

'use strict';
var fs = require("fs"); //Load the filesystem module
var path = require("path"); // Path tools
var to = require("to") // JSON, YML convert

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('folder_list', 'Returns the file, folder (or both) structure from a given source in JSON or YML', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            files: true,
            folders: true
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {

            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            })


            function getFilesizeInBytes(filename) {
                var stats = fs.statSync(filename)
                var fileSizeInBytes = stats["size"]
                return fileSizeInBytes / 1000000.0
            }

            function getExtension(filename) {
                var ext = path.extname(filename||'').split('.');
                return ext[ext.length - 1];
            }


            var structure = [],
                tempInfo = {},
                format = getExtension(f.dest);

            // Parse files
            src.map(function (filename) {

                // Manage Directories
                if (grunt.file.isDir(filename)) {
                    tempInfo = {
                        location: filename,
                        type: 'dir',
                        level: filename.split('/').length
                    }
                    if (options.folders) {
                        structure.push(tempInfo);
                    }

                }

                // Manage Files
                if (grunt.file.isFile(filename)) {
                    tempInfo = {
                        location: filename,
                        filename: path.basename(filename),
                        type: 'file',
                        size: getFilesizeInBytes(filename),
                        level: filename.split('/').length
                    }
                    if (options.files) {
                        structure.push(tempInfo);
                    }
                }
            });


            var contents = JSON.stringify(structure);

            if (format === 'yml'){
                contents = to.format.yaml.stringify(contents);
            }

            grunt.file.write(f.dest, contents);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');

        });
    });

};
