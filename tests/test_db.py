from backend.database import SessionLocal, engine
from sqlalchemy import text


def heath_test():

    with engine.connect() as conn:
        print("Engine SELECT 1 ->", conn.execute(text("SELECT 1")).scalar())


    db = SessionLocal()
    try: 
        db.execute(text("SELECT 1"))    
        print("Session OK")
    finally:
        db.close()    

if __name__ == "__main__":    
    heath_test()    