

module.exports = function () {
  const patterns = [];
  $.gulp.task('pug', () => {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${Math.ceil(Math.random() * 100000)}` });// $.package.version

    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({ pretty: true, locals: JSON.parse($.fs.readFileSync('./content.json', 'utf8')) }))
      .on('error', $.gp.notify.onError(error => ({
        title: 'Pug',
        message: error.message
      })))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.root));
  });
};
