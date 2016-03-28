# GULP PackagingJS

> ES4 style packaging, namespacing, and dependency implementation in JavaScript for GULP.

### Install

```sh
$ npm install --save-dev gulp-packagingjs
```

### Usage Via GULP

```javascript
var gulp = require('gulp');
var gulp_packagingjs = require('gulp-packagingjs');

gulp.task('packagingjs', function()
{
	var input  = './sources/*.js';
	var output = './compiled/';
	
	return gulp
		.src(input)
		.pipe(gulp_packagingjs({strict:true, autorun:'instance', roots:['./sources/']}))
		.pipe(gulp.dest(output));
});

gulp.task('default', ['packagingjs']);
```

### Using PackagingJS

_See the <a href="https://www.npmjs.com/package/packagingjs">packagingjs npm module</a> for documentation on PackagingJS itself. The functionality is the same except for some differences noted here._

##### Notes

1) Do not make your output folder the same as the source folder. The files output with the same name...so you can see how that wouldn't work.

2) Only have your path/glob point to files you want to use as base classes.

3) Unlike normal packagingjs you do not give a name of the the base class when calling the function, just give your compiling options. This is because for GULP it can accept a glob that points to multiple, meaning multiple base classes getting compiled.

4) To facilitate #3 (making multiple base classes) you just point the glob to those class files...but that also means you lose control over namespacing for those base classes. So when using gulp-packagingjs you must make all of your base classes non-namespaced. Their dependencies all work as normal though, only the one base class per compilation has this limitation.

5) Filenames for input will be same as output for each base class file compiled, so it is suggested that you use descriptive class naming, e.g. "HomePage.js" and "SpaceshipGame.js"
