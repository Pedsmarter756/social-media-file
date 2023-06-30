import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";

const EditableInput = ({
  intialValue,
  onSave,
  label = null,
  placeholder = "Write your value",
  emptyMsg = "Input is empty",
  ...inputProps
}) => {
  const [input, setinput] = useState(intialValue);
  const [isEditable, setisEditable] = useState(false);

  const onInputChange = useCallback((value) => {
    setinput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setisEditable((p) => !p);
    setinput(intialValue);
  }, [intialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== intialValue) {
      await onSave(trimmed);
    }

    setisEditable(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        ></Input>

        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? "close" : "edit2"} />
        </InputGroup.Button>

        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
