// import config from 'config';
import path from 'path';
const rootPath = path.join(__dirname, '..', '..');
class ProjectPath {
  constructor(rootPath) {
    const buildPath = path.join(rootPath, 'build');
    const distPatch = path.join(rootPath, 'dist');
    const srcPath = path.join(rootPath, 'src');
    const srcScripts = path.join(srcPath, 'scripts');

    this.distPatch = distPatch;
    this.rootPath = rootPath;

    this.buildPath = {
      all: path.join(buildPath),
      js: path.join(buildPath, 'js'),
      manifest: buildPath
    };

    this.src = {
      scripts: {
        all: srcScripts
      },

      resources: {
        all: ''
      }
    };
  }
}

const projectPath = new ProjectPath(rootPath);

export { rootPath, projectPath };
