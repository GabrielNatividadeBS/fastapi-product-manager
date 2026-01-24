


# CRUD de Produtos

Este é um projeto **fullstack**, desenvolvido com ênfase no **backend**, com o objetivo de praticar e demonstrar conhecimentos em **Python**, **FastAPI**, **arquitetura limpa** e **testes automatizados**.

O frontend foi construído utilizando **vibe coding**, com foco em uma interface simples, clean e funcional, servindo principalmente como apoio para demonstrar o funcionamento da API.

Meu principal objetivo neste projeto foi construir uma base sólida no backend, aplicando boas práticas de desenvolvimento, organização de código e integração eficiente entre as camadas. Reconheço que ainda há diversos pontos a evoluir e aperfeiçoar, especialmente relacionados à qualidade, desempenho e escalabilidade, o que reforça meu compromisso com aprendizado contínuo.



## Backend (meu foco principal)

O backend é o núcleo deste projeto. Toda a API foi implementada em **Python** utilizando **FastAPI**, **SQLAlchemy** e uma arquitetura modular, priorizando clareza, manutenibilidade, escalabilidade e testabilidade.

A estrutura do código foi pensada para facilitar futuras evoluções, seguindo boas práticas amplamente utilizadas no mercado.

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

O frontend foi desenvolvido em **vibe coding**, utilizando **React**, **TypeScript**, **Vite** e **Tailwind CSS**. O objetivo foi entregar uma interface moderna, responsiva e intuitiva, com componentes reutilizáveis e organização clara, sem que o frontend fosse o foco principal do projeto.



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
