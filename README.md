<h1 align="center">
  FaleMais API
</h1>

API desenvolvida com TypeScript e Express para simular e calcular preços de chamadas de longa distância para o produto FaleMais da empresa de telefonia VxTel.

---

O produto FaleMais possui três pacotes: FaleMais 30, FaleMais 60 e FaleMais 120, que oferecem franquias de 30, 60 e 120 minutos, respectivamente.

Ao realizar ligações de uma cidade para outras utilizando esses planos, o cliente usa minutos de sua franquia e paga apenas o excedente, com um acréscimo de 10% sobre a tarifa por minuto.

Os preços por minutos pré-definidos são:

| Origem | Destino | $/min |
|:------:|:-------:|:-----:|
|   011  |   016   |  1.90 |
|   016  |   011   |  2.90 |
|   011  |   017   |  1.70 |
|   017  |   011   |  2.70 |
|   011  |   018   |  0.90 |
|   018  |   011   |  1.90 |

---

### Executando a aplicação

1. Dentro da pasta do projeto, instale as dependências:

```shell
yarn
```

2. Inicie o servidor de desenvolvimento:

```shell
yarn dev:server
```

A API estará acessível no endereço: http://localhost:3333.

---

### Testando a aplicação

```shell
yarn test
```

O test runner, Jest, gerará um report com a cobertura dos testes sobre os services da API. O report estará disponível na pasta `coverage` e pode ser visualizado abrindo o arquivo `coverage/lcov-report/index.html` em qualquer navegador.

---

### Referência da API

### GET `/calls`

Lista todas as configurações de chamada disponíveis no sistema (ver tabela na introdução deste documento).

O retorno é um array de objetos com o seguinte formato:

```json
{
  "origin": "011",
  "destination": "016",
  "tariffPerMinute": 1.9
}
```

### GET `/plans`

Lista todos os planos disponíveis no sistema (FaleMais 30, FaleMais 60 e FaleMais 120).

O retorno é um array de objetos com o seguinte formato:

```json
{
  "slug": "falemais-30",
  "name": "FaleMais 30",
  "quota": 30,
  "overageFee": 0.1
}
```

### POST `/simulations`

Simula uma chamada e retorna os preços da ligação com e sem o plano selecionado.

A API espera um corpo com o seguinte payload:

```json
{
	"planSlug": "falemais-60",
	"duration": 70,
	"origin": "017",
	"destination": "011"
}
```

A **resposta** é um objeto com o seguinte formato:

```json
{
  "origin": "017",
  "destination": "011",
  "overageMinutes": 10,
  "price": 189,
  "priceWithPlan": 29.7
}
```

Caso o plano informado ou a origem e destino não estejam disponíveis (vide descrição no início do documento), a API retornará status 400.

---

### Anatomia do projeto

O projeto utiliza de conceitos do DDD e Clean Architecture.

```
src
 └ config                           → Configuração
 └ modules                          → Módulos separados por domínio
    └ calls                         → Domínio e áreas de conhecimento de chamadas
       └ dtos                       → Data Transfer Objects (interfaces)
       └ infra                      → Configuração de ferramentas e frameworks, relativas a chamadas
         └ http                     → Configuração do servidor
           └ controllers            → Controllers para operações
           └ routes                 → Registro de rotas
           └ schemas                → Esquemas para validação de dados de entrada
         └ memory                   → "Banco de dados" em memória
           └ datastore              → Armazenamento de dados, em arquivos JSON
           └ entities               → Classes/Entidades relativas a chamadas
           └ repositories           → Encapsulamento da lógica de acesso aos dados de chamadas
           └ service                → Objetos dedicados a encapsular regras de negócio da aplicação
       └ repositories               → Interfaces e implementações fake dos repositories
    └ plans                         → Domínio e áreas de conhecimento de planos
       └ dtos                       → Data Transfer Objects (interfaces)
       └ infra                      → Configuração de ferramentas e frameworks, relativos a planos
         └ http                     → Configuração do servidor
           └ controllers            → Controllers para operações
           └ routes                 → Registro de rotas
         └ memory                   → "Banco de dados" em memória
           └ datastore              → Armazenamento de dados, em arquivos JSON
           └ entities               → Classes/Entidades relativas a planos
           └ repositories           → Encapsulamento da lógica de acesso aos dados de planos
           └ service                → Objetos dedicados a encapsular regras de negócio da aplicação
       └ repositories               → Interfaces e implementações fake dos repositories
 └ shared                           → Módulos de uso geral, para toda a aplicação
    └ container                     → Registro do container de IoC
    └ errors                        → Erros genéricos para toda a aplicação
    └ infra                         → Configuração de ferramentas e frameworks
       └ http                       → Configuração central do servidor/framework HTTP
          └ middlewares             → Middlewares de uso geral
          └ routes                  → Registro central de rotas
          └ server.ts               → Inicialização do servidor da aplicação
```
