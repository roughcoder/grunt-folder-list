# grunt-folder-list

> Returns the file, folder or both structure from a given source in JSON or YML.  Includes depth, file size and file type.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-folder-list --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-folder-list');
```

## The "folder_list" task

### Overview
In your project's Gruntfile, add a section named `folder_list` to the data object passed into `grunt.initConfig()`.

#### File Data
The plugin will return the following for each file it finds.
```json
{
	"location" : "anothefolder/anotherfile.js",
  "filename" : "anotherfile.js",
  "filetype" : "js"
  "type"     : "file",
  "size"     : 0,
  "depth"    : 1,
}
```
#### Folder Data
The plugin will return the following for each folder it finds.
```json
{
	"location" : "anothefolder",
	"type"     : "dir",
 	"depth"    : 1
}
```

#### Simple Setup

```js
grunt.initConfig({
  folder_list: {
    options: {
      // Default options, you dont need these they are just to highlight the options available.
      files: true,
	    folders: true
    },
    files: {
			// Create a JSON file (.json)
			'tmp/fixtures.json': ['test/fixtures/**'],
			// Create a YML file (.yml)
			'tmp/fixtures.yml': ['test/fixtures/**'],
      // Create a YML file (.ymal)
			'tmp/fixtures.ymal': ['test/fixtures/**'],
    },
  },
});
```

### Options

#### options.files
Type: `Boolean`
Default value: true

A boolean value to turn off listing files within your output.  Defaults to true.

#### options.folders
Type: `Boolean`
Default value: true

A boolean value to turn off listing folders within your output.  Defaults to true.

### Usage Examples

#### Setup using CWD.

Useful when you want your file and folder locations to start from a set level.

```js
grunt.initConfig({
  default_options : {
    options : {
      files:  true,
      folder: true
    },
    files : [
          {
              src  : ['**'],
              dest : 'tmp/fixtures.json',
              cwd  : 'test/fixtures'
          }
      ]
    },
});
```

#### File & Folder Filters

As with most things Grunt, you can do wildcard selections to ignore certain folders or files.  

The below code will create 2 files (1 JSON and 1 YML).  The JSON file will only log HTML files.  The YML will only list files and folders within folders starting with 'asset'.

```js
grunt.initConfig({
  default_options : {
    options : {
      files:  true,
      folder: true
    },
    files : [
          {
              src  : ['**/*.html'],
              dest : 'tmp/htmlfiles.json',
              cwd  : 'test/fixtures'
          },
					{
              src  : ['asset*/**'],
              dest : 'tmp/assets.yml',
              cwd  : 'test/fixtures'
          }
      ]
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v1.1.0 - 17 Feb 2014 - Clean comments, formatting and package.json
v1.0.0 - 15 Feb 2014 - Tweaks, Docs, Examples, Tests
v0.1.0 - 14 Feb 2014 - Initial Base
