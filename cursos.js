const express = require('express');
const bodyParser = require('body-parser');

// EXERCICIO 1

const app = express();
app.use(bodyParser.json());

let cursos = [];

app.post('/cursos', (req, res) => {
    const {nome, duracao} = req.body;

    if (!nome || !duracao) {
        return res.status(400).json({error: 'Nome e duração obrigatórios.'});
    }

    if (duracao <= 0) {
        return res.status(400).json({error: 'A duração do curso deve ser positivo.'});
    }

    const novoCurso = {
        id: cursos.length + 1,
        nome,
        duracao
    };

    cursos.push(novoCurso);
    res.status(201).json(novoCurso);
});

// EXERCICIO 2

app.get('/cursos', (req, res) => {
    const {nome, duracao} = req.query;

// EXERCICIO 3

    if (!nome && !duracao) {
        return res.json(cursos);
    }

    let cursosFiltrados = cursos;
    if (nome) {
        cursosFiltrados = cursosFiltrados.filter(curso => curso.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (duracao) {
        cursosFiltrados = cursosFiltrados.filter(curso => curso.duracao == duracao);
    }

    res.json(cursosFiltrados);
});

// EXERCICIO 4

app.put('/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, duracao} = req.body;

    const cursoExistente = cursos.find(curso => curso.id === id);
    if (!cursoExistente) {
        return res.status(404).json({error: 'Não encontrado.'});
    }

    if (!nome || !duracao) {
        return res.status(400).json({error: 'Nome e duração são obrigatórios.'});
    }

    if (duracao <= 0) {
        return res.status(400).json({error: 'A duração do curso deve ser positivo.'});
    }

    cursoExistente.nome = nome;
    cursoExistente.duracao = duracao;

    res.status(200).json(cursoExistente);
});

// EXERCICIO 5

app.delete('/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = cursos.findIndex(curso => curso.id === id);
    if (index === -1) {
        return res.status(404).json({error: 'Não encontrado.'});
    }

    cursos.splice(index, 1);
    res.status(204).send();
});


app.listen(3000, () => {
    console.log('Servidor rodando', {PORT});
});
