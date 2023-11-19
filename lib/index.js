// lib/index.js


const { exec } = require('child_process');

exports.installPackages=(projectName)=>
{
  

  let installCmd = `npx express-generator ${projectName} --view=ejs `;
  installCmd +=`&& cd ${projectName} `;
  installCmd +=`&& npm install -g express ejs tailwindcss nodemon `;
  installCmd +=`&& npm install `;
  installCmd +=`&&  npx tailwindcss init `;
  installCmd +=`&&  nodemon -e * `;
  installCmd +=`&&  npm run start `;

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
      
    } else {
      console.error('Erro ao instalar pacotes.');
    }     
  });
}




