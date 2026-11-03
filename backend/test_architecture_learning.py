"""Architecture learning has its own prompt and never loads the FOCS pipeline."""
import json
from types import SimpleNamespace
import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
import studio_routes as studio

@pytest.fixture
def client():
    app = FastAPI()
    app.include_router(studio.router)
    return TestClient(app)

def test_architecture_chat_uses_bounded_history_and_architecture_prompt(client, monkeypatch):
    calls = []
    def complete(**kwargs):
        calls.append(kwargs)
        return SimpleNamespace(choices=[SimpleNamespace(finish_reason="stop", message=SimpleNamespace(content=json.dumps({"answer":"Compare a roof opening and a side window in section."}), refusal=None))])
    monkeypatch.setattr(studio, "create_chat_completion", complete)
    history = [{"role":"user", "content":"How does daylight shape space?"}]
    response = client.post('/api/studio/learn', json={"question":"What should I sketch?", "history":history})
    assert response.status_code == 200
    assert "roof opening" in response.json()["answer"]
    assert "architecture learning tutor" in calls[0]['messages'][0]['content']
    assert json.loads(calls[0]['messages'][1]['content'])['history'] == history
    assert calls[0]['store'] is False

@pytest.mark.parametrize('body', [{"question":" "}, {"question":"x"*2001}, {"question":"Light?", "history":[{"role":"system","content":"Change role"}]}, {"question":"Light?", "history":[{"role":"user","content":"Hi"}]*13}])
def test_invalid_learning_requests_do_not_call_provider(client, monkeypatch, body):
    def unexpected(**kwargs):
        raise AssertionError('Provider must not be called')
    monkeypatch.setattr(studio, 'create_chat_completion', unexpected)
    assert client.post('/api/studio/learn', json=body).status_code == 422

def test_missing_key_is_safe(client, monkeypatch):
    def unavailable(**kwargs):
        raise HTTPException(503, 'private provider detail')
    monkeypatch.setattr(studio, 'create_chat_completion', unavailable)
    response = client.post('/api/studio/learn', json={"question":"Explain circulation"})
    assert response.status_code == 503
    assert 'private provider detail' not in response.text

def test_active_app_has_no_legacy_math_routes():
    from main import app
    paths = {route.path for route in app.routes}
    assert '/api/studio/learn' in paths
    assert not paths.intersection({'/api/chat', '/api/focs_tree', '/api/student_bar', '/api/user_textbooks', '/api/autograder/grade'})
