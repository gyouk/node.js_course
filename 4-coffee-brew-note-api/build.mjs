import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/server.js'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outdir: 'dist',
    format: 'esm',
    sourcemap: false,
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: false,
    treeShaking: true,
    legalComments: 'none',
    external: [
        'express',
        'awilix',
        'zod',
        '@asteasolutions/zod-to-openapi',
        'swagger-ui-express',
        'compression',
        'buffer'
    ],
    loader: {
        '.js': 'js'
    },
}).then(() => {
    console.log('Build successful!');
}).catch(() => process.exit(1));
