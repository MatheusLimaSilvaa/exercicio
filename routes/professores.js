const express = require('express');
const router = express.Router();
const Professor = require('./professores');

router.get('/professores', async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (erro) {
    res.status(500).json({error: 'Erro ao listar os professores.'});
  }
});

router.post('/professores', async (req, res) => {
  const { nome, especialidade } = req.body;
  try {
    const novoProfessor = await Professor.create({ nome, especialidade });
    res.status(201).json(novoProfessor);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar o professor.' });
  }
});

router.put('/professores/:id', async (req, res) => {
  const id = req.params.id;
  const {nome, materia} = req.body;
  try {
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({error: 'Professor não encontrado.'});
    }
    await professor.update({ nome, materia });
    res.json(professor);
  } catch (erro) {
    res.status(400).json({error: 'Erro ao atualizar o professor.'});
  }
});

router.delete('/professores/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({error: 'Professor não encontrado.'});
    }
    await professor.destroy();
    res.status(204).send();
  } catch (erro) {
    res.status(400).json({error: 'Erro ao deletar o professor.'});
  }
});

module.exports = router;
