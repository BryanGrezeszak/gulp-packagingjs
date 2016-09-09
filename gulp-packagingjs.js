// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var packagingjs = require('packagingjs');
var applySourceMap = require('vinyl-sourcemaps-apply');


// Plugin level function(dealing with files)
function gulp_packagingjs(options)
{
	return through.obj(function(file, enc, cb)
	{
		if (file.isNull())
			return cb(null, file); // return empty file
		if (file.isStream())
			throw new Error('Streaming not supported.');
		
		try {
			// gulp-sourcemaps compatibility
			if (file.sourceMap) {
				options.sourcemap = true;
				options.sourcemapin = file.sourceMap;
			}
			
			var base = gutil.replaceExtension(file.path.split('\\').pop(), '');
			var result = packagingjs(base, options);
			file.contents = new Buffer(result.code);
			
			// gulp-sourcemaps compatibility | apply source map to the chain 
			if (file.sourceMap)
				applySourceMap(file, result.sourcemap);
			
			cb(null, file);
		}
		catch (err)
		{
			this.emit('error', new gutil.PluginError('gulp-packagingjs', err, {
				fileName: file.path,
				showProperties: false
			}));
		}
	})
}


// Exporting the plugin main function
module.exports = gulp_packagingjs;