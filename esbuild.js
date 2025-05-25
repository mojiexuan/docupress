const { build } = require('esbuild');
const alias = require('esbuild-plugin-alias');
const path = require('path');
const { readFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, writeFileSync } = require('fs');
const { obfuscate } = require('javascript-obfuscator');

// --- 1. 工具函数：递归复制目录（支持过滤文件）---
function copyDir(src, dest, ignorePatterns = []) {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    const entries = readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        if (ignorePatterns.some(pattern => entry.name.match(pattern))) continue;

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath, ignorePatterns);
        } else {
            copyFileSync(srcPath, destPath);
        }
    }
}

// --- 2. 加密函数 ---
function encryptCode(sourcePath, targetPath) {
    const code = readFileSync(sourcePath, 'utf-8');
    const obfuscatedCode = obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        numbersToExpressions: true,
        identifierNamesGenerator: 'hexadecimal',
        stringArray: true,
        stringArrayThreshold: 0.75,
    }).getObfuscatedCode();
    writeFileSync(targetPath, obfuscatedCode);
}

// --- 3. 主函数 ---
(async () => {
    try {
        console.log('🛠️ 开始构建...');

        // --- 清理旧构建 ---
        if (existsSync('dist')) {
            require('fs').rmSync('dist', { recursive: true });
            console.log('🧹 已清理旧构建目录');
        }

        // --- 读取配置 ---
        const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'));
        const packageJson = require('./package.json');
        const externalDeps = [
            ...Object.keys(packageJson.dependencies || {}),
            ...Object.keys(packageJson.devDependencies || {})
        ];

        // --- 打包完整版本（包含依赖）---
        console.log('📦 打包完整版本（包含依赖）...');
        await build({
            entryPoints: ['./src/index.ts'],
            bundle: true,
            outfile: './dist/index.js',
            platform: 'node',
            format: 'cjs',
            target: 'node22',
            plugins: [
                alias({
                    ...Object.entries(tsconfig.compilerOptions?.paths || {}).reduce((acc, [key, [value]]) => {
                        acc[key] = path.resolve(__dirname, value.replace('/*', ''));
                        return acc;
                    }, {}),
                }),
            ],
            minify: true,
            minifyWhitespace: true,
            minifyIdentifiers: true,
            minifySyntax: true,
        });

        // --- 打包精简版本（不包含依赖）---
        console.log('📦 打包精简版本（不包含依赖）...');
        await build({
            entryPoints: ['./src/index.ts'],
            bundle: true,
            outfile: './dist/index-simple.js',
            platform: 'node',
            format: 'cjs',
            target: 'node22',
            external: externalDeps,
            plugins: [
                alias({
                    ...Object.entries(tsconfig.compilerOptions?.paths || {}).reduce((acc, [key, [value]]) => {
                        acc[key] = path.resolve(__dirname, value.replace('/*', ''));
                        return acc;
                    }, {}),
                }),
            ],
            minify: true,
            minifyWhitespace: true,
            minifyIdentifiers: true,
            minifySyntax: true,
        });

        // --- 加密文件 ---
        console.log('🔒 加密文件...');
        encryptCode('./dist/index.js', './dist/index-obfuscated.js');
        encryptCode('./dist/index-simple.js', './dist/index-simple-obfuscated.js');

        // --- 复制静态文件 ---
        console.log('📂 复制静态资源...');
        mkdirSync('dist', { recursive: true });
        copyDir('src/public', 'dist/public', [/\.tmp$/, /\.DS_Store/]);
        copyDir('src/docs', 'dist/docs');
        copyDir('src/views', 'dist/views');
        copyFileSync('src/.config.yaml', 'dist/.config.yaml');

        // 复制 package.json
        const { scripts, devDependencies, ...prodPackageJson } = packageJson;
        writeFileSync(
            'dist/package.json',
            JSON.stringify({
                ...prodPackageJson,
                main: 'index.js'  // 默认使用完整版本
            }, null, 2)
        );

        console.log('✅ 构建成功！');
        console.log('📁 生成文件:');
        console.log('- index.js (完整打包)');
        console.log('- index-obfuscated.js (完整加密版)');
        console.log('- index-simple.js (精简版)');
        console.log('- index-simple-obfuscated.js (精简加密版)');
        console.log(require('child_process').execSync('tree -L 2 dist', { encoding: 'utf-8' }));
    } catch (err) {
        console.error('❌ 构建失败:', err);
        process.exit(1);
    }
})();