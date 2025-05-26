# Sistema SOA – Tendência de Nomes no Brasil

Este projeto demonstra, de forma mínima, uma arquitetura orientada a serviços (SOA) que consome a **API de nomes do IBGE**.

```
UI (SPA)  ──►  Gateway (BFF)  ──►  API IBGE
```

## Estrutura
```
atividadeArqSoa/
├─ ui/               # Front‑end estático (HTML, CSS, JS)
├─ gateway/          # Back‑end (API Gateway/BFF)
│   ├─ routes/       # Nome, Ranking, Comparação
│   └─ Dockerfile
├─ docker-compose.yml
└─ README.md
```

## Pré‑requisitos
* Node.js 20+ **ou** Docker 24+

## Executando com Docker

```bash
docker compose up --build
```

* Gateway disponível em **http://localhost:3001**
* UI servida pelo próprio gateway – abra `http://localhost:3001/index.html`

## Executando sem Docker

```bash
cd gateway
npm install
node index.js
```
Depois abra `ui/index.html` em um servidor local (ex.: extensão *Live Server* do VSCode).

## Rotas REST expostas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/nomes/:nome?de=&ate=` | Série histórica de um nome |
| GET | `/api/ranking?uf=&decada=` | Top 3 nomes por década na UF |
| GET | `/api/comparacao?nomeA=&nomeB=` | Dados brutos para comparar dois nomes |

Sinta‑se livre para expandir, adicionar cache Redis, testes e Swagger!
