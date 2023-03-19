const {globSync} = require('glob');

module.exports = {
  name: 'Hetzner Cloud API',
  entryPoints: globSync('src/**/*.ts', {ignore: {childrenIgnored: (p) => p.isNamed('__tests__')}}),
  categorizeByGroup: true,
  mergeModulesMergeMode: 'module',
  excludePrivate: false,
};
