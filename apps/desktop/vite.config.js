export default {
  build: {
    ssr: 'server.js',
    outDir: 'build',
    rollupOptions: { output: { entryFileNames: 'index.js' } },
  },
};
