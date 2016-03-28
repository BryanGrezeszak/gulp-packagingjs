// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var packagingjs = require('packagingjs');


// Plugin level function(dealing with files)
function gulp_packagingjs(options)
{
	try
	{
		return through.obj(function(file, enc, cb)
		{
			if (file.isNull())
				return cb(null, file); // return empty file
			if (file.isStream())
				throw new gutil.PluginError('gulp-packagingjs', 'Streaming not supported.');
			
			var base = gutil.replaceExtension(file.path.split('\\').pop(), '');
			file.contents = new Buffer(packagingjs(base, options));
			
			cb(null, file);
		})
	}
	catch (err)
	{
		throw new gutil.PluginError('gulp-packagingjs', err.message);
	}
}


function gulpStream(text)
{
	var stream = through();
	stream.write(text);
	return stream;
}


// Exporting the plugin main function
module.exports = gulp_packagingjs;