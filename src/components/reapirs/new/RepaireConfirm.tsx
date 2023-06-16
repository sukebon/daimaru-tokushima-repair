import { FC } from 'react';
import { Text, Flex, Box, Stack, Table } from '@mantine/core';
import useRepaireStore from '../../../../store/useRepaireStore';

export const RepaireConfirm: FC = () => {
  const repair = useRepaireStore((state) => state.repair);
  return (
    <>
      <Flex p={6} justify="center">
        <Text fz="lg">以下の内容で登録して宜しいでしょうか。</Text>
      </Flex>
      <Stack mt={24} p={6} spacing={24}>
        <Box>
          <Text fz="xs">工場名</Text>
          <Text fz="xl">{repair.factories.name}</Text>
        </Box>
        <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Text fz="xs">希望納期</Text>
            <Text fz="xl">{repair?.deadline}</Text>
          </Box>
          <Box>
            <Text fz="xs">出荷先</Text>
            <Text fz="xl">{repair?.deliveryPlace}</Text>
          </Box>
          <Box>
            <Text fz="xs">顧客名</Text>
            <Text fz="xl">{repair?.customer}</Text>
          </Box>
        </Flex>
        <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Text fz="xs">タイプ</Text>
          </Box>
          <Box>
            <Text fz="xs">入荷場所</Text>
            <Text fz="xl">
              {repair?.status === 'PICKING' ? '倉庫' : '工場直送'}
            </Text>
          </Box>
        </Flex>

        <Box sx={{ overflow: 'auto' }}>
          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="sm"
            miw={500}
            maw={1000}
          >
            <thead>
              <tr>
                <th>修理名</th>
                <th>価格</th>
                <th style={{ textAlign: 'center' }}>新規/前回通り</th>
              </tr>
            </thead>
            <tbody>
              {repair?.repair_contents.map((content, index: number) => (
                <tr key={index}>
                  <td style={{ width: '60%' }}>{content.title}</td>
                  <td style={{ width: '20%' }}>{content.price}円</td>
                  <td style={{ width: '20%', textAlign: 'center' }}>
                    {content.is_new ? '新規' : '前回通り'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="sm"
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
            <tbody>
              {repair?.repair_details.map((detail, index: number) => (
                <tr key={index}>
                  <td style={{ width: '50%' }}>{detail.product_name}</td>
                  <td>{detail.size}</td>
                  <td>{detail.quantity}</td>
                  <td style={{ width: '25%' }}>{detail.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <Box>
          <Text fz="xs">コメント</Text>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>{repair?.comment}</Box>
        </Box>
      </Stack>
    </>
  );
};
