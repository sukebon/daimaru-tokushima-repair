import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  NumberInput,
  Switch,
  TextInput,
} from '@mantine/core';
import React, { FC } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form';
import { RepairInputs } from '../../../../types';
import { MdOutlineCancel } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';
import { TemplateDrawer } from '@/components/templates/TemplateDrawer';

type Props = {
  register: UseFormRegister<RepairInputs>;
  control: Control<RepairInputs>;
  getValues: UseFormGetValues<RepairInputs>;
  watch: UseFormWatch<RepairInputs>;
};

export const RepairFormContents: FC<Props> = ({
  register,
  control,
  getValues,
  watch,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'repair_contents',
  });

  const addContent = () => {
    append({
      id: '',
      title: '',
      price: 0,
      image_url: '',
      is_new: false,
    });
  };
  const removeContent = (index: number) => {
    remove(index);
  };

  const selectContent = (
    index: number,
    data: {
      title: string;
      price: number;
      image_url: string;
    }
  ) => {
    update(index, {
      id: '',
      title: data.title,
      price: data.price,
      image_url: data.image_url,
      is_new: false,
    });
  };

  return (
    <>
      <Box mt={36} sx={{ overflowX: 'auto' }}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Box mt={12}>{`■修理 ${index + 1}`}</Box>
            <Box mt={12} sx={{ width: '800px' }} w={{ lg: '100%' }}>
              <Flex justify="center" gap={16}>
                <>
                  <TextInput
                    disabled={
                      watch(`repair_contents.${index}.title`) ? false : true
                    }
                    w="550px"
                    label="修理名"
                    required
                    {...register(`repair_contents.${index}.title`, {
                      required: true,
                    })}
                  />
                  <NumberInput
                    disabled={
                      Number(watch(`repair_contents.${index}.title`)) ===  0 ? true : false
                    }
                    w="150px"
                    label="価格"
                    required
                    defaultValue={getValues(`repair_contents.${index}.price`)}
                    {...register(`repair_contents.${index}.price`, {
                      required: true,
                    })}
                    onChange={() => getValues()}
                    max={1000000}
                    min={0}
                  />
                  <TextInput
                    display="none"
                    {...register(`repair_contents.${index}.image_url`)}
                  />
                  <Flex w="100px" pb={3} align="flex-end">
                    <Switch
                      defaultChecked={getValues(
                        `repair_contents.${index}.is_new`
                      )}
                      size="lg"
                      onLabel="新規案件"
                      offLabel="前回通り"
                      color="teal"
                      {...register(`repair_contents.${index}.is_new`)}
                    />
                  </Flex>
                </>

                <Box>
                  {<Box>　</Box>}
                  <Flex align="center" gap={12}>
                    <TemplateDrawer
                      selectContent={selectContent}
                      rowIndex={index}
                    />
                    <MdOutlineCancel
                      size={20}
                      cursor={index === 0 ? '' : 'pointer'}
                      // opacity={index === 0 ? 0 : 1}
                      onClick={() => {
                        // if (index === 0) return;
                        removeContent(index);
                      }}
                    />
                  </Flex>
                </Box>
              </Flex>
              <>
                <Image
                  mt={24}
                  src={watch(`repair_contents.${index}.image_url`)}
                  alt=""
                  width="100%"
                  maw="300px"
                />
              </>
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Flex justify="center">
        <Button
          mt={12}
          color="teal"
          leftIcon={<MdAddCircle />}
          variant="outline"
          size="md"
          onClick={addContent}
        >
          修理を追加
        </Button>
      </Flex>
    </>
  );
};
