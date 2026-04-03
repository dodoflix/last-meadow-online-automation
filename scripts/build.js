const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'src', 'content.js');
const EXT_DIR = path.join(ROOT, 'extension');

// Clean & create dist
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });

function zipDir(srcDir, outPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(srcDir, false);
    archive.finalize();
  });
}

async function build() {
  // 1. Minify console script
  console.log('→ Minifying console script...');
  const terser = path.join(ROOT, 'node_modules', '.bin', 'terser');
  execSync(`${terser} ${SRC} --compress --mangle -o ${path.join(DIST, 'console-script.min.js')}`, { stdio: 'inherit' });

  const orig = fs.statSync(SRC).size;
  const mini = fs.statSync(path.join(DIST, 'console-script.min.js')).size;
  console.log(`  ${(orig / 1024).toFixed(1)}KB → ${(mini / 1024).toFixed(1)}KB (${Math.round((1 - mini / orig) * 100)}% smaller)`);

  // 2. Build Chrome extension (MV3, no browser_specific_settings)
  console.log('→ Building Chrome extension...');
  const chromeTmp = path.join(DIST, '_chrome');
  fs.mkdirSync(path.join(chromeTmp, 'icons'), { recursive: true });

  const manifest = JSON.parse(fs.readFileSync(path.join(EXT_DIR, 'manifest.json'), 'utf8'));
  delete manifest.browser_specific_settings;
  fs.writeFileSync(path.join(chromeTmp, 'manifest.json'), JSON.stringify(manifest, null, 2));
  fs.copyFileSync(SRC, path.join(chromeTmp, 'content.js'));
  for (const icon of fs.readdirSync(path.join(EXT_DIR, 'icons')).filter(f => f.endsWith('.png'))) {
    fs.copyFileSync(path.join(EXT_DIR, 'icons', icon), path.join(chromeTmp, 'icons', icon));
  }

  await zipDir(chromeTmp, path.join(DIST, 'chrome-extension.zip'));
  fs.rmSync(chromeTmp, { recursive: true });

  // 3. Build Firefox extension (full manifest with gecko settings)
  console.log('→ Building Firefox extension...');
  const ffTmp = path.join(DIST, '_firefox');
  fs.mkdirSync(path.join(ffTmp, 'icons'), { recursive: true });

  fs.writeFileSync(path.join(ffTmp, 'manifest.json'), JSON.stringify(
    JSON.parse(fs.readFileSync(path.join(EXT_DIR, 'manifest.json'), 'utf8')), null, 2
  ));
  fs.copyFileSync(SRC, path.join(ffTmp, 'content.js'));
  for (const icon of fs.readdirSync(path.join(EXT_DIR, 'icons')).filter(f => f.endsWith('.png'))) {
    fs.copyFileSync(path.join(EXT_DIR, 'icons', icon), path.join(ffTmp, 'icons', icon));
  }

  await zipDir(ffTmp, path.join(DIST, 'firefox-extension.zip'));
  fs.rmSync(ffTmp, { recursive: true });

  console.log('\n✅ Build complete! Artifacts in dist/');
  for (const f of fs.readdirSync(DIST)) {
    const s = fs.statSync(path.join(DIST, f)).size;
    console.log(`  ${f} (${(s / 1024).toFixed(1)}KB)`);
  }
}

build().catch(e => { console.error(e); process.exit(1); });

