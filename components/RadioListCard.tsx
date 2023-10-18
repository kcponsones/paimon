import { ArenaChooseModeBox, ArenaChooseModeWrapper } from "@/src/styles/Arena";
import { useRadio } from "@chakra-ui/react";

export default function RadioListCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radiobox = getRadioProps();

  return (
    <ArenaChooseModeWrapper as="label">
      <input {...input} />
      <ArenaChooseModeBox
        {...radiobox}
        w="100%"
        cursor="pointer"
        _checked={{
          bg: "#ecdeb5",
          color: "#1E223F",
          borderColor: "teal.600",
          border: "3px solid #ecdeb5",
        }}
      >
        {props.children}
      </ArenaChooseModeBox>
    </ArenaChooseModeWrapper>
  );
}
