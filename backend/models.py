from sqlalchemy import Column, Integer, Float,Boolean, String
from .database import Base
from enum import Enum
from sqlalchemy import Enum as SAEnum

class CategoryGroup(str, Enum):
    """
    Enum que representa os grupos principais de categorias de produtos.
    """
    Eletronics = "Eletrônicos"
    Sports = "Esporte"
    Health = "Saúde"
    Food = "Alimentos"

CATEGORY_GROUP_MAP: dict[CategoryGroup, set[str]] = {

    CategoryGroup.Eletronics: {"Celular", "Teclado", "Headset", "Webcam", "Mouse", "TV", "Monitor"},
    CategoryGroup.Sports: {"Bola", "Tênis", "Bicicleta", "Basquete", "Futebol"},
    CategoryGroup.Health: {"Escova de Dente", "Protetor Labial", "Protetor Solar", "Sabonete"},
    CategoryGroup.Food: {"Fruta", "Doce", "Salgado", "Almoço"}
}

class Product(Base):
    """
    Modelo que representa um produto na base de dados.

    Attributes:
        id (int): Identificador único do produto.
        name (str): Nome do produto.
        category_group (CategoryGroup): Grupo principal da categoria do produto.
        category (str): Subcategoria do produto.
        description (str): Descrição do produto.
        price (float): Preço do produto.
        stock (bool): Indica se o produto está em estoque.
    """
    __tablename__ = "products"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(100), unique = True, nullable = False, index = True)
    category_group = Column(SAEnum(CategoryGroup, name = "category_group", native_enum = False), nullable = False, index = True)
    category = Column(String(100), nullable = False)
    description = Column(String(500))
    price = Column(Float, nullable = False)
    stock = Column(Boolean, default = False, nullable = False)