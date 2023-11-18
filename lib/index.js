// lib/index.js
// index.js

const { exec } = require('child_process');

function installPackages() {
  const packages = [
    'express',
    'express-generator',
    'tailwindcss',
    'typescript',
    'nodemon'
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

function installAdditionalPackages(projectName) {
  const projectPath = `./${projectName}`;
  const installCmd = `cd ${projectPath} && npm install nodemon --save-dev`;

  const child = exec(installCmd);

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Nodemon installed successfully!');
      configureNodemonScript(projectName);
    } else {
      console.error('Error installing Nodemon.');
    }
  });
}

function configureNodemonScript(projectName) {
  const projectPath = `./${projectName}`;
  const configureCmd = `cd ${projectPath} && echo nodemon ./bin/www > start-dev.bat`;

  const child = exec(configureCmd);

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Nodemon configured successfully!');
      console.log(`To start the server, run: cd ${projectName} && start-dev.bat`);
    } else {
      console.error('Error configuring Nodemon.');
    }
  });
}

installPackages();


