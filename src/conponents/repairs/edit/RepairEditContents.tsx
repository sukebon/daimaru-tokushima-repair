import { Checkbox, Flex, Input, NumberInput } from '@mantine/core';
import React, { FC } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

type Props = {
  register: UseFormRegister<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
};

export const RepairEditContents: FC<Props> = ({
  register,
  control,
  getValues,
}) => {
  const { fields, update } = useFieldArray({
    control,
    name: 'repair_contents',
  });
  return (
    <>
      {fields.map((field, index) => (
        <tr key={field.id}>
          <td>
            <Input
              w="100%"
              size="xs"
              defaultValue={getValues(`repair_contents.${index}.title`)}
              {...register(`repair_contents.${index}.title` as const, {})}
            />
          </td>
          <td>
            <NumberInput
              w="100px"
              size="xs"
              defaultValue={Number(getValues(`repair_contents.${index}.price`))}
              {...register(`repair_contents.${index}.price` as const, {
                required: true,
              })}
              onChange={() => getValues()}
              max={1000000}
              min={0}
            />
          </td>
          <td>
            <Flex align="center">
              <Checkbox
                w="180px"
                label="新規の場合はチェック"
                color="teal"
                defaultChecked={getValues(`repair_contents.${index}.is_new`)}
                {...register(`contents.${index}.is_new`)}
              />
            </Flex>
          </td>
        </tr>
      ))}
    </>
  );
};
