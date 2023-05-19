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
import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RepairEditContents } from './RepairEditContents';
import { RepairEditDetails } from './RepairEditDetails';
import { useMutateRepair } from '@/hooks/repairs/useMutateRepair';
import { useQueryRepair } from '@/hooks/repairs/useQueryRepair';

type Props = {
  repairId: number | undefined;
};

export const RepairEdit: FC<Props> = ({ repairId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<Repair>(['repairs', repairId]);
  const { data: repair } = useQueryRepair(Number(repairId));
  const {
    updateRepairMutation,
    updateRepairContentsMutation,
    updateRepairDetailsMutation,
  } = useMutateRepair();
  const { classes } = useStyles();
  const { register, handleSubmit, reset, control, getValues } = useForm({
    defaultValues: {
      ...repair,
    },
  });
  console.log(repair);
  const onSubmit: SubmitHandler<any> = async (data) => {
    updateRepairMutation.mutate(data);
    updateRepairContentsMutation.mutate(data);
    updateRepairDetailsMutation.mutate(data);
    reset({ ...data });
    close();
  };
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
                    <th style={{ width: '150px', textAlign: 'center' }}>
                      メーカー名
                    </th>
                    <th style={{ width: '350px', textAlign: 'center' }}>
                      商品名
                    </th>
                    <th style={{ width: '100px', textAlign: 'center' }}>
                      サイズ
                    </th>
                    <th style={{ width: '110px', textAlign: 'center' }}>
                      数量
                    </th>
                    <th style={{ width: '150px', textAlign: 'center' }}>
                      備考
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <RepairEditDetails
                    register={register}
                    control={control}
                    getValues={getValues}
                  />
                </tbody>
              </Table>
            </Box>

            <Box>
              <Box fz="xs">コメント</Box>
              <Textarea {...register('comment')} />
            </Box>
          </Stack>
          <Group mt="xl">
            <Button type="submit" variant="outline">
              更新
            </Button>
          </Group>
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
