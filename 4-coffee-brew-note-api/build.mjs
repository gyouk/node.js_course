import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/server.js'], // Ваша точка входу (можна змінити за потреби)
    bundle: true,
    platform: 'node',
    target: 'node22',         // або node20, залежно від вашої версії Node.js
    outdir: 'dist',
    format: 'esm',            // якщо ви використовуєте import/export (ESM)
    sourcemap: true,          // (опційно, для дебагу)
    minifySyntax: true,             // мінімізує код
    minifyWhitespace: true,
    minifyIdentifiers: false,       // зберігаємо імена змінних/функцій
    treeShaking: true,              // видаляємо невикористовуваний код
    legalComments: 'none',          // прибираємо коментарі
    external: [               // не бандлити залежності (Node.js сам підтягує з node_modules)
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
