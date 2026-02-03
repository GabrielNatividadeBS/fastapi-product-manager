


# CRUD de Produtos

Este projeto é um CRUD de produtos desenvolvido com foco principal no backend, com o objetivo de praticar e consolidar conhecimentos em Python, FastAPI, SQLAlchemy e testes automatizados.

A aplicação foi pensada como um projeto de estudo, buscando simular um cenário real de API REST, com organização de código, validação de dados e tratamento adequado de erros.



## Backend (meu foco principal)

O backend é o núcleo do projeto. A API foi construída em Python utilizando FastAPI, com persistência de dados via SQLAlchemy e banco relacional.

A organização do código segue uma estrutura modular, facilitando a leitura, manutenção e evolução do projeto.

### Estrutura dos arquivos

- **app.py**: inicialização da API e definição das rotas principais  
- **crud.py**: operações de criação, leitura, atualização e exclusão (CRUD)  
- **database.py**: configuração da conexão e gerenciamento da sessão com o banco de dados  
- **models.py**: definição dos modelos ORM  
- **schemas.py**: validação e serialização de dados com Pydantic 



### Principais Funcionalidades

- CRUD completo de produtos
- Filtros e busca avançada
- Validação de dados e tratamento de erros
- Testes automatizados com Pytest


### Como executar o backend

```bash
pip install -r requirements.txt
uvicorn backend.app:app --reload
```


### Testes

```bash
pytest tests/
```



## Frontend

O frontend foi desenvolvido como apoio para visualização e consumo da API.
Foi construído utilizando React, TypeScript, Vite e Tailwind CSS, priorizando uma interface simples, funcional e responsiva.

O foco principal do projeto permanece no backend.



### Como executar o frontend

```bash
cd frontend-crud
npm install
npm run dev
```



## Estrutura do Projeto

```
CRUD/
├── backend/           # API FastAPI, modelos, banco, schemas (meu foco principal)
├── frontend-crud/     # Aplicação React + Vite (vibe coding)
├── tests/             # Testes do backend
├── requirements.txt   # Dependências do backend
```

## Link do Projeto

'''
https://frontend-production-e235.up.railway.app/
'''