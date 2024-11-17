// verify-setup.js
const fs = require('fs');
const path = require('path');

const checkSetup = () => {
  console.log('Checking project setup...\n');

  // Check configuration files
  const requiredFiles = [
    'package.json',
    'postcss.config.js',
    'tailwind.config.js',
    'src/index.css'
  ];

  console.log('Checking configuration files:');
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check specific content
      if (file === 'src/index.css' && !content.includes('@tailwind')) {
        console.log(`❌ ${file} (missing Tailwind directives)`);
      } else if (file === 'package.json') {
        const pkg = JSON.parse(content);
        const hasRequired = [
          'tailwindcss',
          'autoprefixer',
          'postcss',
          'lucide-react'
        ].every(dep => 
          (pkg.dependencies && pkg.dependencies[dep]) || 
          (pkg.devDependencies && pkg.devDependencies[dep])
        );
        console.log(`${hasRequired ? '✅' : '❌'} ${file}`);
      } else {
        console.log(`✅ ${file}`);
      }
    } else {
      console.log(`❌ ${file} (missing)`);
    }
  });

  // Check node_modules
  console.log('\nChecking dependencies:');
  const nodeModulesExists = fs.existsSync('node_modules');
  console.log(`${nodeModulesExists ? '✅' : '❌'} node_modules`);

  // Check src structure
  console.log('\nChecking source structure:');
  const srcFolders = [
    'src/components/game',
    'src/components/ui',
    'src/contexts',
    'src/constants',
    'src/reducers',
    'src/utils'
  ];

  srcFolders.forEach(folder => {
    if (fs.existsSync(folder)) {
      console.log(`✅ ${folder}`);
    } else {
      console.log(`❌ ${folder} (missing)`);
    }
  });
};

checkSetup();