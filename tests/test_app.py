import sys
from pathlib import Path
import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.app import create_app
from app.app_routes.sqlalch_config import Config
from app.init_extensions import db

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

@pytest.fixture()
def app_instance():
    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
    yield app
    

def test_info_route(app_instance):
    client = app_instance.test_client()
    resp = client.get('/info')
    assert resp.status_code == 200
