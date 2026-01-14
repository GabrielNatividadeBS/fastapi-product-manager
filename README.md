
# CRUD de Produtos

API e aplicação web para gerenciamento de produtos, desenvolvida com foco em boas práticas, organização e escalabilidade.

## Backend

O backend foi implementado em Python utilizando FastAPI, com SQLAlchemy para ORM e integração a banco de dados relacional. A arquitetura está dividida em módulos para facilitar manutenção e extensibilidade:

- **app.py**: inicialização da API, rotas principais
- **crud.py**: operações de criação, leitura, atualização e exclusão
- **database.py**: configuração da conexão e sessão com o banco
- **models.py**: definição dos modelos ORM
- **schemas.py**: validação e serialização de dados (Pydantic)

### Principais Funcionalidades

- Cadastro, listagem, edição e remoção de produtos
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

O frontend foi desenvolvido em React com TypeScript, Vite e Tailwind CSS, garantindo uma interface moderna, responsiva e de fácil uso. Componentes reutilizáveis e organização por hooks, services e types facilitam a escalabilidade.

### Como executar o frontend

```bash
cd frontend-crud
npm install
npm run dev
```

## Estrutura do Projeto

```
CRUD/
├── backend/           # API FastAPI, modelos, banco, schemas
├── frontend-crud/     # Aplicação React + Vite
├── tests/             # Testes do backend
├── requirements.txt   # Dependências do backend
```
