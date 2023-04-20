import { FC } from 'react';
import { Text, Flex, Box, Stack, Table } from '@mantine/core';
import useRepaireStore from '../../../store/useRepaireStore';

export const RepaireConfirm: FC = () => {
  const repaire = useRepaireStore((state) => state.repaire);
  return (
    <>
      <Flex p={6} justify="center">
        <Text fz="lg">以下の内容で登録して宜しいでしょうか。</Text>
      </Flex>
      <Stack mt={24} p={6} spacing={24}>
        <Box>
          <Text fz="xs">工場名</Text>
          <Text fz="xl">{repaire?.factory}</Text>
        </Box>
        <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Text fz="xs">希望納期</Text>
            <Text fz="xl">{repaire?.deadline}</Text>
          </Box>
          <Box>
            <Text fz="xs">出荷先</Text>
            <Text fz="xl">{repaire?.deliveryPlace}</Text>
          </Box>
          <Box>
            <Text fz="xs">顧客名</Text>
            <Text fz="xl">{repaire?.client}</Text>
          </Box>
          <Box>
            <Text fz="xs">修理名</Text>
            <Text fz="xl">{repaire?.title}</Text>
          </Box>
        </Flex>
        <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Text fz="xs">タイプ</Text>
            <Text fz="xl">
              {repaire?.orderType === 'REPAIRE' ? '修理' : 'マーク'}
            </Text>
          </Box>
          <Box>
            <Text fz="xs">区分</Text>
            <Text fz="xl">
              {repaire?.category === 'PREV' ? '前回通り' : '新規'}
            </Text>
          </Box>
          <Box>
            <Text fz="xs">単価</Text>
            <Text fz="xl">{repaire?.price}円</Text>
          </Box>
        </Flex>

        <Box sx={{ overflow: 'auto' }}>
          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="md"
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
              {repaire?.products.map(
                (
                  product: {
                    productNumber: string;
                    size: string;
                    quantity: number;
                    comment: string;
                  },
                  index: number
                ) => (
                  <tr key={index}>
                    <td>{product.productNumber}</td>
                    <td>{product.size}</td>
                    <td>{product.quantity}</td>
                    <td>{product.comment}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Box>
        <Box>
          <Text fz="xs">コメント</Text>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>{repaire?.comment}</Box>
        </Box>
      </Stack>
    </>
  );
};
