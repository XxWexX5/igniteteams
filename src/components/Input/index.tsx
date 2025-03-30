import { TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: InputProps) {
  return (
    <TextInput
      ref={inputRef}
      className="bg-neutral-700 w-full h-[7vh] rounded-[1.5vw] px-[3vw] text-neutral-full placeholder:text-neutral-300"
      placeholder="Nome da turma"
      {...rest}
    />
  );
}
