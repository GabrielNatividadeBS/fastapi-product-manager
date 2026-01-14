from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .database import engine, get_db
from .models import Base
from .schemas import ProductCreate, ProductRead, ProductUpdate
from . import crud

Base.metadata.create_all(bind = engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def Home():
    """
    Endpoint raiz para verificar se o backend está no ar.

    Returns:
        dict: Mensagem de status do backend.
    """
    return {"Message": "Backend no AR!"}


@app.post("/produto/criar-produto", response_model = ProductRead, status_code = 201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """
    Cria um novo produto.

    Args:
        product (ProductCreate): Dados do produto a ser criado.
        db (Session): Sessão do banco de dados.

    Returns:
        ProductRead: Produto criado.
    """
    return crud.create_product(db, product)


@app.get("/produto/listar-produtos", response_model = list[ProductRead])
def list_products(category_group: str = Query(None), db: Session = Depends(get_db)):
    """
    Lista todos os produtos, com opção de filtro por grupo de categoria.

    Args:
        category_group (str, optional): Grupo de categoria para filtrar. Default é None.
        db (Session): Sessão do banco de dados.

    Returns:
        list[ProductRead]: Lista de produtos encontrados.
    """
    return crud.get_products(db, category_group)

@app.get("/produto/{product_id}", response_model = ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Busca um produto pelo ID.

    Args:
        product_id (int): ID do produto a ser buscado.
        db (Session): Sessão do banco de dados.

    Returns:
        ProductRead: Produto encontrado.

    Raises:
        HTTPException: Se o produto não for encontrado.
    """
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code = 404, detail = "Produto não encontrado")
    return product


@app.put("/produto/atualizar-produto/{product_id}", response_model = ProductRead)
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    """
    Atualiza os dados de um produto existente.

    Args:
        product_id (int): ID do produto a ser atualizado.
        product (ProductUpdate): Novos dados do produto.
        db (Session): Sessão do banco de dados.

    Returns:
        ProductRead: Produto atualizado.

    Raises:
        HTTPException: Se o produto não for encontrado.
    """
    product = crud.update_product(db, product_id, product)
    if not product:
        raise HTTPException(status_code = 404, detail = "Produto não encontrado")
    return product

@app.delete("/produto/remover-produto/{product_id}", status_code = 204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Remove um produto do banco de dados.

    Args:
        product_id (int): ID do produto a ser removido.
        db (Session): Sessão do banco de dados.

    Returns:
        None

    Raises:
        HTTPException: Se o produto não for encontrado.
    """
    product = crud.delete_product(db, product_id)
    if not product:
        raise HTTPException(status_code = 404, detail = "Produto não encontrado")
    return