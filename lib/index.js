// lib/index.js
// index.js

const { exec } = require('child_process');
const readline = require('readline');

// Cria uma interface para leitura do console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para ler o nome do projeto do usuário
function getProjectName(callback) {
  rl.question('Digite o nome do projeto: ', (answer) => {
    // Fecha a interface após obter a resposta
    rl.close();
    callback(answer.trim()); // Chama a função de callback com o nome do projeto
  });
}

function installPackages() {
  const packages = [
    'express',
    'express-generator',
    'tailwindcss',
    'typescript',
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

function initializeProject() {
  // Chama a função getProjectName para obter o nome do projeto do usuário
  getProjectName((projectName) => {
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
        console.log(`Projeto Express '${projectName}' inicializado com sucesso!`);
        } else {
        console.error('Erro ao inicializar o projeto Express.');
      }
    });
  });
}



// Inicia o processo pedindo o nome do projeto
installPackages();
