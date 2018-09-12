// задача - cоздание прайтов из png исходников


module.exports = function () {
  $.gulp.task('sprite', () => {
    let spriteData = $.gulp.src('./source/icons/*.png').pipe($.gp.spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      imgPath: '/assets/img/sprite.png',
      cssFormat: 'css',
      algorithm: 'left-right',
      padding: 70
    }));
    let imgStream = spriteData.img
      .pipe($.gulp.dest('./source/images')); // путь куда записываем спрайт

    let cssStream = spriteData.css
      .pipe($.gulp.dest('./source/styles/_misc')); // путь куда записываем файл стилей для спрайта

    return $.merge(imgStream, cssStream);
  });
};
