const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add asset support
config.resolver.assetExts.push('jpg', 'png', 'jpeg', 'gif', 'webp');

module.exports = config;