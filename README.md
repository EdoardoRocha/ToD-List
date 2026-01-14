# ToDóList 📝

> Sistema para controle de tarefas com temporizador Pomodoro integrado, desenvolvido por **Edoardo Rocha Paz**.

O **ToDóList** é uma aplicação completa (Fullstack) que permite aos utilizadores gerir as suas tarefas diárias de forma eficiente, aliando a organização de listas à técnica Pomodoro para aumentar a produtividade.

---

## 💻 Sobre o Projeto

O projeto nasceu da necessidade de um gestor de tarefas que integrasse o foco direto. O sistema verifica em tempo real o estado da ligação com o servidor e com o banco de dados MongoDB para garantir a persistência das informações.

---

## 🛠 Tecnologias Utilizadas

### **Frontend**

* **React 19** com **Vite**
* **Tailwind CSS** para estilização
* **React Router Dom** para navegação
* **Lucide-react** para ícones
* **Axios** para consumo da API
* **React-toastify** para notificações

### **Backend**

* **Node.js** com **Express 5**
* **MongoDB** & **Mongoose** (Banco de dados NoSQL)
* **Consign** para auto-loading de módulos
* **PM2** & **Nodemon** para gestão do servidor

---

## ✨ Funcionalidades

* ✅ **Gestão de Tarefas:** CRUD completo (Criar, Listar, Editar e Eliminar).
* ✅ **Pomodoro Timer:** Ciclos de 25 minutos de foco e 5 minutos de pausa.
* ✅ **Monitorização (Health Check):** Verificação de status do servidor e memória utilizada diretamente na interface.
* ✅ **User Avatar:** Integração com Gravatar para exibição automática de avatares via MD5 hash do email.
* ✅ **Responsividade:** Layout adaptável para dispositivos móveis com menu lateral otimizado.

---

## 📁 Estrutura do Projeto

O repositório está dividido em dois diretórios principais:

```text
├── backend/
│   ├── api/            # Lógica das rotas (tasks, health)
│   ├── config/         # Configurações (Express, MongoDB, Rotas)
│   └── index.js        # Ponto de entrada do servidor
└── frontend/
    ├── src/
    │   ├── components/ # Componentes (Pomodoro, TaskForm, Header)
    │   ├── App.jsx     # Componente raiz
    │   └── main.jsx    # Renderização do React e Contextos
    └── tailwind.config.js # Configuração do Tailwind

```

---

## 🚀 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/edoardorocha/tod-list.git

```

### 2. Configurar o Backend

```bash
cd backend
npm install
# Crie um ficheiro .env com as variáveis: MONGO_URL, URL e PORT
npm start

```

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
npm run dev

```

---

## 📡 Endpoints da API

O backend expõe os seguintes endpoints:

| Método | Rota | Descrição |
| --- | --- | --- |
| **GET** | `/health` | Verifica integridade do sistema e DB |
| **GET** | `/tasks` | Lista todas as tarefas |
| **POST** | `/tasks` | Cria uma nova tarefa |
| **POST** | `/tasks/:id` | Atualiza uma tarefa existente |
| **DELETE** | `/tasks/:id` | Remove uma tarefa |

---

### 📄 Licença

Este projeto é distribuído sob a licença **ISC**.