// lib/index.js

const { exec } = require('child_process');

function installPackages() {
  const packages = [
    'express-generator',
    'typescript',
    'ts-node',
    'tailwindcss'
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
      console.log('Pacotes instalados com sucesso!');
      initializeProject();
    } else {
      console.error('Erro ao instalar pacotes.');
    }
  });
}

function initializeProject(projectName = 'meu-projeto-express') {
    const initCmd = `npx express-generator ${projectName} --view=ejs` 
    initCmd+= `&& cd ${projectName} && npx tailwindcss init && npx tsc --init`;

  const child = exec(initCmd);

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`Projeto Express '${projectName}' inicializado com sucesso!`);
       installAdditionalPackages(projectName);
    } else {
      console.error('Erro ao inicializar o projeto Express.');
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
        console.log('Nodemon instalado com sucesso!');
        configureNodemonScript(projectName);
      } else {
        console.error('Erro ao instalar Nodemon.');
      }
    });
  }
  
  function configureNodemonScript(projectName) {
    const projectPath = `./${projectName}`;
    const configureCmd = `cd ${projectPath} && echo "nodemon ./bin/www" > start-dev && chmod +x start-dev`;
  
    const child = exec(configureCmd);
  
    child.stdout.on('data', (data) => {
      console.log(data);
    });
  
    child.stderr.on('data', (data) => {
      console.error(data);
    });
  
    child.on('close', (code) => {
      if (code === 0) {
        console.log('Configuração do Nodemon concluída com sucesso!');
      } else {
        console.error('Erro ao configurar o Nodemon.');
      }
    });
  }
  


module.exports = {
  installPackages,
  initializeProject,
  installAdditionalPackages,
  configureNodemonScript
};
