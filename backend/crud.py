from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Product, CategoryGroup, CATEGORY_GROUP_MAP
from schemas import ProductCreate, ProductUpdate



def get_category_group(category: str) -> CategoryGroup:
    """
    Retorna o grupo de categoria principal ao qual a categoria pertence.

    Args:
        category (str): Nome da categoria a ser verificada.

    Returns:
        CategoryGroup: Grupo de categoria correspondente à categoria informada.

    Raises:
        HTTPException: Se a categoria não pertencer a nenhum grupo válido.
    """


    for group, categories in CATEGORY_GROUP_MAP.items():
        if category in categories:
            return group
    raise  HTTPException(status_code = 400, detail = "Essa categoria não pertece a um grupo válido" )  


def create_product(db: Session, product: ProductCreate):
    """
    Cria um novo produto no banco de dados.

    Args:
        db (Session): Sessão do banco de dados.
        produto (ProductCreate): Dados do produto a ser criado.

    Returns:
        Product: Produto criado.
    """
    category_group = get_category_group(product.category)
    new_product = Product(
        name = product.name,
        category = product.category,
        description = product.description,
        price = product.price,
        stock = product.stock,
        category_group = category_group
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

def get_products(db: Session, category_group: str = None):
    """
    Retorna uma lista de produtos, podendo filtrar por grupo de categoria.

    Args:
        db (Session): Sessão do banco de dados.
        category_group (str, optional): Grupo de categoria para filtrar. Default é None.

    Returns:
        list[Product]: Lista de produtos encontrados.
    """

    query = db.query(Product)
    if category_group:
        query = query.filter(Product.category_group == category_group)
    return query.all()    

def get_product(db: Session, product_id: int):
    """
    Busca um produto pelo ID.

    Args:
        db (Session): Sessão do banco de dados.
        product_id (int): ID do produto a ser buscado.

    Returns:
        Product | None: Produto encontrado ou None se não existir.
    """

    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, product: ProductUpdate):
    """
    Atualiza os dados de um produto existente.

    Args:
        db (Session): Sessão do banco de dados.
        product_id (int): ID do produto a ser atualizado.
        produto (ProductUpdate): Dados novos do produto.

    Returns:
        Product | None: Produto atualizado ou None se não existir.
    """

    db_product = get_product(db, product_id)
    if db_product:
        for key, value in product.model_dump().items():
            setattr(db_product, key, value)
        if product.category:    
            db_product.category_group = get_category_group(product.category)
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    """
    Remove um produto do banco de dados.

    Args:
        db (Session): Sessão do banco de dados.
        product_id (int): ID do produto a ser removido.

    Returns:
        Product | None: Produto removido ou None se não existir.
    """

    db_product = get_product(db, product_id)
    if db_product:
        db.delete(db_product)
        db.commit()
    return {f"Message": "Produto de id: {product_id} deletado com sucesso!"}    