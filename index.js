const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'img')));

// Define o armazenamento do arquivo
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = mime.extension(file.mimetype);
    const fileName = uniqueSuffix + '.' + fileExtension;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Configurações do servidor
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/envio', (req, res) => {
  res.sendFile(path.join(__dirname, 'envio.html'));
});

// Rota para o formulário de upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Aqui você pode salvar o arquivo no banco de dados ou fazer qualquer outra ação necessária
  const file = req.file;
  console.log(file);

  res.send('Arquivo enviado com sucesso!');
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
