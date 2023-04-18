import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Text,
  Flex,
  Box,
  Stack,
  Table,
  Badge,
  ScrollArea,
} from '@mantine/core';
import { FC } from 'react';

export const RepaireModal: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const repaireDetails = [
    {
      id: '1',
      productNumber: 'SP110A コックコート',
      size: 'S',
      quantity: '12',
      comment: 'コメント',
    },
    {
      id: '2',
      productNumber: 'SP120 コックコート',
      size: 'M',
      quantity: '12',
      comment: 'コメント',
    },
  ];
  const rows = repaireDetails.map((detail) => (
    <tr key={detail.id}>
      <td>{detail.productNumber}</td>
      <td>{detail.size} </td>
      <td>{detail.quantity}</td>
      <td>{detail.comment}</td>
    </tr>
  ));
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
              <Text fz="xs">伝票ナンバー</Text>
              <Text fz="md">No.000001</Text>
            </Box>
            <Box>
              <Text fz="xs">担当</Text>
              <Text fz="md">向井</Text>
            </Box>
          </Flex>
          <Box>
            <Text fz="xs">工場名</Text>
            <Text fz="md">徳島工場</Text>
          </Box>
          <Flex gap={16} direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Text fz="xs">希望納期</Text>
              <Text fz="md">2023-04-28</Text>
            </Box>
            <Box>
              <Text fz="xs">出荷先</Text>
              <Text fz="md">配送センター</Text>
            </Box>
          </Flex>
          <Flex gap={16} direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Text fz="xs">顧客名</Text>
              <Text fz="md">共同リネンサプライ</Text>
            </Box>
            <Box>
              <Text fz="xs">修理名</Text>
              <Text fz="md">裾上げ</Text>
            </Box>
            <Box>
              <Text fz="xs">区分</Text>
              <Text fz="md">前回通り</Text>
            </Box>
          </Flex>
          <Box>
            <Text fz="xs">単価</Text>
            <Text fz="md">500円</Text>
          </Box>

          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="xs"
            miw={500}
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
            <tbody>{rows}</tbody>
          </Table>

          <Box>
            <Text fz="xs">コメント</Text>
            <Box>すべてルイスでお願いします。</Box>
          </Box>
        </Stack>

        <Flex mt="xl" justify={{ base: 'left', md: 'right' }}>
          <Button variant="outline" onClick={close}>
            閉じる
          </Button>
        </Flex>
      </Modal>

      <Group position="center">
        <Button color="teal" onClick={open}>詳細</Button>
      </Group>
    </>
  );
};
