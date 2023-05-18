import { useQueryRepair } from '@/hooks/repairs/useQueryRepair';
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  Modal,
  Stack,
  Table,
  Textarea,
  createStyles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Factory } from '../../../types';
import { RepairEditContents } from './RepairEditContents';
import { RepairEditDetails } from './RepairEditDetails';

type Props = {
  repairId: number | undefined;
};

export const RepairEdit: FC<Props> = ({ repairId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: repair } = useQueryRepair(repairId || '');
  console.log('repair', repair);
  const { classes } = useStyles();
  const { register, handleSubmit, reset, control, getValues } = useForm({
    defaultValues: {
      ...repair,
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {};
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close(), reset();
        }}
        title="編集"
        size="1000px"
        yOffset="100px"
        zIndex={10000}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={24} p="sm">
            <Flex
              gap={16}
              direction={{ base: 'column', md: 'row' }}
              justify={{ base: 'none', md: 'space-between' }}
            >
              <Box>
                <Box fz="xs">伝票ナンバー</Box>
                <Box fz="md">{repair?.id}</Box>
              </Box>
              <Box>
                <Box fz="xs">担当</Box>
                <Box fz="md">
                  {!Array.isArray(repair?.profiles) &&
                    repair?.profiles?.username}
                </Box>
              </Box>
            </Flex>
            <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
              <Box>
                <Box fz="xs">工場名</Box>
                <Input {...register('factories.name')} />
              </Box>
              <Box>
                <Box fz="xs">希望納期</Box>
                <Input type="date" {...register('deadline')} />
              </Box>
              <Box>
                <Box fz="xs">出荷先</Box>
                <Input {...register('deliveryPlace')} />
              </Box>
              <Box>
                <Box fz="xs">顧客名</Box>
                <Input {...register('customer')} />
              </Box>
            </Flex>
            <Box sx={{ overflowX: 'auto' }}>
              <Table
                horizontalSpacing="xs"
                verticalSpacing="xs"
                fontSize="xs"
                withBorder
                withColumnBorders
                miw={600}
                maw="auto"
              >
                <thead>
                  <tr className={classes.tr}>
                    <th style={{ textAlign: 'center' }}>修理名</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>単価</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>区分</th>
                  </tr>
                </thead>
                <tbody>
                  <RepairEditContents
                    register={register}
                    control={control}
                    getValues={getValues}
                  />
                </tbody>
              </Table>
              <Table
                mt="md"
                horizontalSpacing="xs"
                verticalSpacing="xs"
                fontSize="xs"
                miw={600}
                maw="auto"
                withBorder
                withColumnBorders
              >
                <thead>
                  <tr className={classes.tr}>
                    <th style={{ textAlign: 'center' }}>商品名</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>
                      サイズ
                    </th>
                    <th style={{ width: '60px', textAlign: 'center' }}>数量</th>
                    <th style={{ textAlign: 'center' }}>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <RepairEditDetails
                    register={register}
                    control={control}
                    getValues={getValues}
                  />
                  {/* {Array.isArray(repair?.repair_details) &&
                    repair?.repair_details?.map((detail) => (
                      <tr key={detail.id}>
                        <td>{detail.product_name}</td>
                        <td style={{ textAlign: 'center' }}>{detail.size} </td>
                        <td style={{ textAlign: 'right' }}>
                          {detail.quantity}
                        </td>
                        <td>{detail?.comment}</td>
                      </tr>
                    ))} */}
                </tbody>
              </Table>
            </Box>

            <Box>
              <Box fz="xs">コメント</Box>
              <Textarea {...register('comment')} />
            </Box>
          </Stack>
        </form>
      </Modal>
      <Group position="right">
        <Button color="teal" onClick={open}>
          編集
        </Button>
      </Group>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  tr: {
    backgroundColor:
      theme.colorScheme === 'light'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
}));
