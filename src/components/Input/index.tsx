import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="mt-[3vh] bg-neutral-700 w-full h-[7vh] rounded-[1.5vw] px-[5vw] text-neutral-full placeholder:text-neutral-300"
      placeholder="Nome da turma"
      {...rest}
    />
  );
}
