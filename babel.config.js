module.exports = api => {
  const isTest = api.env('test');
  
  // Only use Babel configuration during tests
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
    };
  }

  // Return empty config for non-test environments
  return {};
}; 