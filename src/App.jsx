import { useEffect, useState } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { Dialog } from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { SubHeading } from "./components/SubHeading";
import { ToDoItem } from "./components/ToDoItem";
import { ToDoList } from "./components/ToDoList";
import { TodoForm } from "./components/TodoForm";

const TODOS = "todos";
const savedTodo = localStorage.getItem(TODOS);

function App() {
  const [showDialog, setShowDialog] = useState(false);

  const [todos, setTodos] = useState(() => {
    if (savedTodo) {
      return JSON.parse(savedTodo);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const addTodo = (formData) => {
    let description = formData.get("description");
    setTodos((prevState) => {
      const newTodo = {
        id: prevState.length + 1,
        description: description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevState, newTodo];
    });
    console.log("form submetido");
    toggleDialog();
  };

  const toggleTodoCompleted = (todo) => {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });
    });
  };

  const removeTodo = (todo) => {
    setTodos((prevState) => {
      const novoArray = prevState
        .filter(function (item) {
          return item.id != todo.id;
        })
        .map(function (item, index) {
          return {
            ...item,
            id: index + 1,
          };
        });
      return novoArray;
    });
  };


  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>
        <ChecklistsWrapper>
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos
              .filter((todo) => !todo.completed)
              .map(function (t) {
                return (
                  <ToDoItem
                    key={t.id}
                    item={t}
                    onToggleCompleted={toggleTodoCompleted}
                    onDelete={removeTodo}
                  />
                );
              })}
          </ToDoList>
          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {todos
              .filter((todo) => todo.completed)
              .map(function (t) {
                return (
                  <ToDoItem
                    key={t.id}
                    item={t}
                    onToggleCompleted={toggleTodoCompleted}
                    onDelete={removeTodo}
                  />
                );
              })}
          </ToDoList>
          <Footer>
            <Dialog isOpen={showDialog} onClose={toggleDialog}>
              <TodoForm onSubmit={addTodo} />
            </Dialog>
            <FabButton onClick={toggleDialog}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
