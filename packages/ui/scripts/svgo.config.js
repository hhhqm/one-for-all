const plugins = {
  cleanupAttrs: true,
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeTitle: true,
  removeDesc: true,
  removeUselessDefs: true,
  removeEditorsNSData: true,
  removeEmptyAttrs: true,
  removeHiddenElems: true,
  removeEmptyText: true,
  removeEmptyContainers: true,
  removeViewBox: false,
  cleanupEnableBackground: true,
  convertStyleToAttrs: true,
  convertColors: true,
  convertPathData: true,
  convertTransform: true,
  removeUnknownsAndDefaults: true,
  removeNonInheritableGroupAttrs: true,
  removeUselessStrokeAndFill: true,
  removeUnusedNS: true,
  cleanupIDs: true,
  cleanupNumericValues: true,
  moveElemsAttrsToGroup: true,
  moveGroupAttrsToElems: true,
  collapseGroups: true,
  removeRasterImages: false,
  mergePaths: true,
  convertShapeToPath: true,
  sortAttrs: true,
  removeDimensions: true,
  removeAttrs: { attrs: '(stroke)' },
  removeAttributesBySelector: {
    selectors: [
      { selector: "[fill = 'none']", attributes: 'fill' },
      { selector: "[fill = '#94A3B8']", attributes: 'fill' },
    ],
  },
};

module.exports = {
  multipass: false,
  plugins: Object.keys(plugins).map(key => ({ [key]: plugins[key] })),
  // js2svg: {
  //   pretty: true,
  //   indent: '  ',
  // },
};