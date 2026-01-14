from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)


def test_create_product():
    response = client.post("/produto/criar-produto", json = {
        "name": "Teclado Gamer",
        "category": "Teclado",
        "description": "Teclado Gamer RGB",
        "price": 156.0,
        "stock": True
    })
    assert response.status_code == 201
    assert response.json()["name"] == "Teclado Gamer"

def test_list_products():
    response = client.get("/produto/listar-produtos")    
    assert response.status_code == 200
    assert len(response.json()) == 5

def test_list_product():
    product_id = 11
    response = client.get(f"/produto/{product_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Teclado Gamer"

def test_update_product():
    product_id = 10
    response = client.put(f"/produto/atualizar-produto/{product_id}", json = {
        "name": "Bola de Futebol",
        "category": "Bola",
        "description": "Bola Nike",
        "price": 236.0,
        "stock": True
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Bola de Futebol"


def test_delete_product():
    product_id = 8
    response = client.delete(f"/produto/remover-produto/{product_id}")
    assert response.status_code == 204

    get_resp = client.get(f"/produto/{product_id}")
    assert get_resp.status_code == 404    

def test_get_nonexistent_product():
    response = client.get("/produto/15")    
    assert response.status_code == 404