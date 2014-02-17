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

            // Create a cmd var even if not used to reduce errors
            var cwd = '';
            if (f.cwd) {
                cwd = f.cwd;
            }
            // Check the src files before using them
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(cwd + filepath)) {
                    grunt.log.warn('Source file "' + cwd + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            })

            // Function to return the file size back in MB
            function getFilesizeInBytes(filename) {
                var stats = fs.statSync(filename)
                var fileSizeInBytes = stats["size"]
                return fileSizeInBytes / 1000000.0
            }

            // Function to get the extension a filename
            function getExtension(filename) {
                var ext = path.extname(filename || '').split('.');
                return ext[ext.length - 1];
            }


            // Output variables
            var structure = [],
                tempInfo = {},
                format = getExtension(f.dest);

            // Parse files
            src.map(function (filename) {

                // Manage Directories
                if (grunt.file.isDir(cwd + filename)) {
                    // Create directory object
                    tempInfo = {
                        location: filename,
                        type: 'dir',
                        depth: filename.split('/').length
                    }
                    if (options.folders) {
                        structure.push(tempInfo);
                    }

                }

                // Manage Files
                if (grunt.file.isFile(cwd + filename)) {
                    // Create file object
                    tempInfo = {
                        location: filename,
                        filename: path.basename(cwd + filename),
                        type: 'file',
                        size: getFilesizeInBytes(cwd + filename),
                        depth: filename.split('/').length - 1,
                        filetype: getExtension(cwd + filename)
                    }
                    if (options.files) {
                        structure.push(tempInfo);
                    }
                }
            });

            // Convert structure object to JSON
            var contents = JSON.stringify(structure);

            // Check if yml
            if (format === 'yml' || format === 'ymal') {
                contents = to.format.yaml.stringify(contents);
            }

            // Write out the file
            grunt.file.write(f.dest, contents);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');

        });
    });

};
