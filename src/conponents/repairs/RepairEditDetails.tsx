import { Box, Checkbox, Flex, Input, NumberInput } from '@mantine/core';
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

export const RepairEditDetails: FC<Props> = ({
  register,
  control,
  getValues,
}) => {
  const { fields, update } = useFieldArray({
    control,
    name: 'repair_details',
  });
  return (
    <>
      {fields.map((field, index) => (
        <tr key={field.id}>
          <td>
            <Input
              w="100%"
              defaultValue={getValues(`repair_details.${index}.product_name`)}
              {...register(`repair_details.${index}.product_name` as const, {})}
            />
          </td>
          <td>
            <Input
              w="100px"
              defaultValue={getValues(`repair_details.${index}.size`)}
              {...register(`repair_details.${index}.size` as const, {
                required: true,
              })}
            />
          </td>
          <td>
            <NumberInput
              w="100px"
              defaultValue={getValues(`repair_details.${index}.quantity`)}
              {...register(`repair_details.${index}.quantity` as const, {
                required: true,
              })}
              onChange={() => getValues()}
              max={1000000}
              min={0}
            />
          </td>
          <td>
            <Input
              w="100%"
              defaultValue={getValues(`repair_details.${index}.comment`)}
              {...register(`repair_details.${index}.comment` as const)}
            />
          </td>
        </tr>
      ))}
    </>
  );
};
