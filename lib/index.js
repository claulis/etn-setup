// lib/index.js


const { exec } = require('child_process');

function installPackages() {
  const packages = [
    'express',
    'express-generator',
    'tailwindcss',
    'typescript'
  ];

  const installCmd = `npm install -g ${packages.join(' ')}`;

  const child = exec(installCmd);

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Packages installed successfully!');
      initializeProject();
    } else {
      console.error('Error installing packages.');
    }
  });
}

function initializeProject(projectName = 'my-express-project') {
  const initCmd = `npx express-generator ${projectName} --view=ejs && cd ${projectName} && npx tailwindcss init -p && npx tsc --init`;

  const child = exec(initCmd);

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`Express project '${projectName}' initialized successfully!`);
      installAdditionalPackages(projectName);
    } else {
      console.error('Error initializing Express project.');
    }
  });
}


installPackages();


