import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Box,
  Flex,
  Stack,
  Table,
  Badge,
} from '@mantine/core';
import { FC, useState } from 'react';
import { Repair } from '../../../types';

type Props = {
  repair: any;
};

export const RepaireModal: FC<Props> = ({ repair }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<Repair>(repair);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="詳細"
        size="xl"
        padding="xl"
        yOffset="100px"
        zIndex={10000}
      >
        <Stack>
          <Badge color="indigo" size="lg">
            修理
          </Badge>
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
              <Box fz="md">{repair?.profiles.username}</Box>
            </Box>
          </Flex>
          <Box>
            <Box fz="xs">工場名</Box>
            <Box fz="md">{repair?.factories.name}</Box>
          </Box>
          <Flex gap={16} direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Box fz="xs">希望納期</Box>
              <Box fz="md">{repair?.deadline}</Box>
            </Box>
            <Box>
              <Box fz="xs">出荷先</Box>
              <Box fz="md">{repair?.deliveryPlace}</Box>
            </Box>
          </Flex>
          <Flex gap={16} direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Box fz="xs">顧客名</Box>
              <Box fz="md">{repair?.customer}</Box>
            </Box>
          </Flex>
          <Box>
            {data?.repair_contents.map((content) => (
              <Flex gap={12} fz="md" key={content.id}>
                <Box>
                  <Box fz="xs">修理名</Box>
                  <Box>{content.title}</Box>
                </Box>
                <Box>
                  <Box fz="xs">単価</Box>
                  <Box>{content.price || 0}円</Box>
                </Box>
                <Box>
                  <Box fz="xs">区分</Box>
                  <Box>前回通り</Box>
                </Box>
              </Flex>
            ))}
          </Box>

          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="xs"
            maw={1000}
          >
            <thead>
              <tr>
                <th>商品名</th>
                <th>サイズ</th>
                <th>数量</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {data?.repair_details.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.product_name}</td>
                  <td>{detail.size} </td>
                  <td>{detail.quantity}</td>
                  <td>{detail?.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Box>
            <Box fz="xs">コメント</Box>
            <Box>{repair?.comment}</Box>
          </Box>
        </Stack>

        <Flex mt="xl" justify={{ base: 'left', md: 'right' }}>
          <Button variant="outline" onClick={close}>
            閉じる
          </Button>
        </Flex>
      </Modal>

      <Group position="center">
        <Button size="xs" color="teal" onClick={open}>
          詳細
        </Button>
      </Group>
    </>
  );
};
