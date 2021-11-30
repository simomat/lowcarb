module.exports = {
  // presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3, },],],
};
