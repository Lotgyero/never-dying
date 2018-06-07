//import 'babel-polyfill';
//import { logger } from 'logger';

import { projectPath } from 'local-paths';
import gutil from 'gutil';
import gulp from 'gulp';

import webpackStream from 'webpack-stream';
import { webpackConfig } from './webpack.config.js';

import del from 'del';

//import config from 'config';

const clean = () => {
  return del([projectPath.buildPath.all, projectPath.distPatch]);
};
const scripts = watch => {
  const scriptsN = () => {
    const webpackConfigBuild = webpackConfig;
    webpackConfigBuild.watch = watch || false;
    return gulp
      .src(projectPath.src.scripts.all)
      .pipe(webpackStream(webpackConfigBuild))
      .on('error', gutil.log)
      .pipe(gulp.dest(projectPath.buildPath.js));
  };
  return scriptsN;
};

gulp.task('clean', clean);

const build = gulp.series(clean, gulp.parallel(scripts(false)));

const watch = () => {
  gulp.watch(projectPath.src.scripts.all, scripts(true));
};
gulp.task('watch', gulp.series(clean, build, watch));
gulp.task('default', gulp.series(clean, build));
