import { Button } from "../Button";
import { TextInput } from "../TextInput";

export function TodoForm({ onSubmit }) {
  return (
    <form action={onSubmit}>
      <TextInput
        required
        name="description"
        placeholder="Digite o item que deseja adicionar"
      />
      <Button>Salvar Item</Button>
    </form>
  );
}
