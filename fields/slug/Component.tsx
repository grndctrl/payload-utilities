"use client";

import { TextInput, CheckboxInput, FieldLabel, useField } from "@payloadcms/ui";
import { CheckboxField, GroupField, TextField } from "payload";
import { ChangeEventHandler, useState } from "react";

type Props = GroupField & {
  path: string;
  fieldMap: [TextField, CheckboxField];
  custom: {
    enable: boolean;
  };
};

const Component = ({ path, fieldMap, ...props }: Props) => {
  const text = useField<string>({ path: `${path}.${fieldMap[0].name}` });
  const isOverrideActive = useField<boolean>({
    path: `${path}.${fieldMap[1].name}`,
  });

  const handleChangeText: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    text.setValue(target.value);
  };

  const handleChangeCheckbox: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    isOverrideActive.setValue(target.checked);
  };

  return (
    <div>
      <FieldLabel label={"Slug"} />
      <div className="relative">
        <TextInput
          path={path}
          readOnly={!isOverrideActive.value}
          onChange={handleChangeText}
          value={text.value}
        />
        <div className="absolute right-0 top-0 h-full flex items-center">
          <CheckboxInput
            name={path + "-isOverrideActive"}
            className="mr-5"
            checked={isOverrideActive.value}
            onToggle={handleChangeCheckbox}
          />
        </div>
      </div>
    </div>
  );
};

export default Component;
