#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do projeto...\n');

let hasErrors = false;

// 1. Verificar arquivos essenciais
const requiredFiles = [
  'server.js',
  'api/get-following-list.js',
  'api/get-instagram-puppeteer-clean.js',
  'src/components/HomeComponents/InstagramLogin.jsx',
  'package.json'
];

console.log('📁 Verificando arquivos essenciais:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) hasErrors = true;
});

// 2. Verificar se a rota está registrada no server.js
console.log('\n🔗 Verificando rotas no server.js:');
const serverContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');

const routes = [
  { name: 'get-following-list', pattern: /get-following-list/g },
  { name: 'get-instagram-puppeteer-clean', pattern: /get-instagram-puppeteer-clean/g },
  { name: 'search-profile', pattern: /search-profile/g }
];

routes.forEach(route => {
  const matches = serverContent.match(route.pattern);
  const count = matches ? matches.length : 0;
  const registered = count >= 2; // require + app.get
  console.log(`  ${registered ? '✅' : '❌'} /api/${route.name} ${registered ? `(${count} referências)` : '(não encontrada)'}`);
  if (!registered) hasErrors = true;
});

// 3. Verificar package.json
console.log('\n📦 Verificando dependências:');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

const requiredDeps = [
  'express',
  'cors',
  'puppeteer',
  'axios',
  'react',
  'react-router-dom'
];

requiredDeps.forEach(dep => {
  const installed = packageJson.dependencies[dep];
  console.log(`  ${installed ? '✅' : '❌'} ${dep} ${installed ? `(${installed})` : '(não instalado)'}`);
  if (!installed) hasErrors = true;
});

// 4. Verificar scripts
console.log('\n🚀 Verificando scripts:');
const scripts = packageJson.scripts || {};
console.log(`  ${scripts.start ? '✅' : '❌'} npm start ${scripts.start ? `→ ${scripts.start}` : ''}`);
console.log(`  ${scripts.server ? '✅' : '❌'} npm run server ${scripts.server ? `→ ${scripts.server}` : ''}`);
console.log(`  ${scripts.dev ? '✅' : '❌'} npm run dev ${scripts.dev ? `→ ${scripts.dev}` : ''}`);

// 5. Verificar node_modules
console.log('\n📚 Verificando instalação:');
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
console.log(`  ${nodeModulesExists ? '✅' : '❌'} node_modules ${nodeModulesExists ? '(instalado)' : '(execute: npm install)'}`);
if (!nodeModulesExists) hasErrors = true;

// 6. Verificar versão do Node
console.log('\n🔧 Verificando ambiente:');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
const nodeOk = majorVersion >= 18;
console.log(`  ${nodeOk ? '✅' : '⚠️'} Node.js ${nodeVersion} ${nodeOk ? '(OK)' : '(recomendado: v20.x)'}`);

// 7. Verificar portas (se possível)
console.log('\n🌐 Configuração de portas:');
console.log(`  ℹ️  Backend: ${process.env.PORT || 5000}`);
console.log(`  ℹ️  Frontend: ${process.env.REACT_APP_PORT || 3000}`);

// 8. Verificar variáveis de ambiente
console.log('\n🔐 Variáveis de ambiente:');
const hasEnvFile = fs.existsSync(path.join(__dirname, '.env'));
console.log(`  ${hasEnvFile ? '✅' : 'ℹ️'} .env ${hasEnvFile ? '(encontrado)' : '(opcional - para cookies do Instagram)'}`);

if (hasEnvFile) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const hasCookies = /IG_COOKIES|IG_SESSIONID/.test(envContent);
  console.log(`  ${hasCookies ? '✅' : 'ℹ️'} Cookies do Instagram ${hasCookies ? '(configurados)' : '(não configurados - usará dados mockados)'}`);
}

// Resumo
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ ERROS ENCONTRADOS! Corrija os problemas acima.');
  console.log('\n💡 Dicas:');
  console.log('  - Execute: npm install');
  console.log('  - Verifique se todos os arquivos foram criados');
  console.log('  - Reinicie o servidor após mudanças');
  process.exit(1);
} else {
  console.log('✅ TUDO CONFIGURADO CORRETAMENTE!');
  console.log('\n🚀 Para iniciar:');
  console.log('  1. Terminal 1: npm start (servidor backend)');
  console.log('  2. Terminal 2: npm run dev (frontend React)');
  console.log('  3. Acesse: http://localhost:3000');
  console.log('\n📖 Documentação:');
  console.log('  - API-FOLLOWING.md');
  console.log('  - COMO-USAR-FOLLOWING.md');
  console.log('  - TROUBLESHOOTING.md');
}
console.log('='.repeat(50) + '\n');
