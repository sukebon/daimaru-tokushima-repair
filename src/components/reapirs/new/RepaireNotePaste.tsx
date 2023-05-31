import { Button, Group, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC, useState } from 'react';
import { Control, UseFormWatch, useFieldArray } from 'react-hook-form';
import { RepairInputs } from '../../../../types';

type Props = {
  watch: UseFormWatch<RepairInputs>;
  control: Control<RepairInputs>;
  addDetail: Function;
  updateDetail: Function;
};

export const RepaireNotePaste: FC<Props> = ({
  watch,
  control,
  addDetail,
  updateDetail,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [content, setContent] = useState('');

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'repair_details',
  });

  const notePaste = () => {
    const array = content.split('\n').filter((v) => v !== '');
    const newArray = array.map((row) => {
      return row.split('   ');
    });
    const noteRows = array.length;
    const inputRows = watch(`repair_details`).length;
    const gapRows = noteRows - inputRows;
    for (let i = 0; i < gapRows; i++) {
      addDetail();
    }
    newArray.forEach((row, index) => {
      updateDetail(row, index);
    });
    close();
    setContent('');
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="ノート貼付"
        size="lg"
        yOffset={100}
        zIndex={10000}
      >
        <Textarea
          minRows={10}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></Textarea>
        <Group mt="xl" position="right">
          <Button
            color="teal"
            variant="outline"
            onClick={() => {
              setContent(''), close();
            }}
          >
            閉じる
          </Button>
          <Button color="teal" onClick={notePaste}>
            貼付
          </Button>
        </Group>
      </Modal>

      <Button variant="outline" size="md" color="teal" onClick={open}>
        ノート貼付
      </Button>
    </>
  );
};
