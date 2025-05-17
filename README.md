# Tendências de Nomes no Brasil

## Visão Geral

Este projeto exemplifica a aplicação de **Arquitetura Orientada a Serviços (SOA)** consumindo a API pública de nomes do IBGE.

1. **Frequência de Nome** (`NomeService`)
   - Endpoint interno: `GET /api/nome/evolucao?nome={nome}`
   - Consulta: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/{nome}`
   - Frequência por década em JSON.

2. **Ranking** (`RankingService`)
   - Endpoint interno: `GET /api/nome/top3?localidade={UF}&decada={década}`
   - Consulta: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?decada={década}&localidade={UF}`
   - Top 3 nomes por década.

3. **Comparação** (`ComparacaoService`)
   - Endpoint interno: `GET /api/nome/comparar?nome1={nome1}&nome2={nome2}`
   - Consulta: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/{nome1}|{nome2}`
   - Frequência de ambos nomes.

### Frontend (SPA)

- **HTML/CSS/JS** puro, com Chart.js para visualização.
- Consome os endpoints internos e exibe:
  1. Evolução da frequência (gráfico de linha).
  2. Top 3 por estado (tabela).
  3. Comparação de dois nomes (gráfico comparativo).

## Estrutura de Pastas

```
atividadeArqSoa/
├── index.html           # SPA
├── css/
│   └── style.css        # Estilos
├── js/
│   └── app.js           # Lógica frontend
```

## Boas Práticas SOA

- **/css**: cada serviço tem responsabilidade única.
- **js/app.js**: Recebe interações da UI, orquestra quais serviços devem ser chamados, trata erros e repassa dados formatados para a view. Mantém a UI desacoplada das APIs externas..
- **js/chartUtils.js**: Fornece um “serviço” de geração de gráficos (Chart.js) encapsulado. Pode ser invocado de qualquer página ou outro serviço sem duplicar código.

---

*Desenvolvido para a Atividade Prática de SOA: Análise de Tendências de Nomes no Brasil.*