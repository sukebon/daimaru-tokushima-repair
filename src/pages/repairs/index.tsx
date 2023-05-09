import { RepaireModal } from '@/conponents/repair/RepaireModal';
import { useQueryRepairs } from '@/hooks/repairs/useQueryRepairs';
import { Badge, Box, Paper } from '@mantine/core';
import { Table } from '@mantine/core';
import { NextPage } from 'next';

const Repairs: NextPage = () => {
  const { data } = useQueryRepairs();
  console.log(data);
  // const repaires = [
  //   {
  //     id: '00005',
  //     status: 'END',
  //     staff: '向井',
  //     customer: '共同リネンサプライ',
  //     title: '股下修理',
  //     totalQuantity: 30,
  //     price: 500,
  //     deliveryPlace: '配送センター',
  //     deadline: '2023-04-26',
  //   },
  //   {
  //     id: '00004',
  //     status: 'START',
  //     staff: '向井',
  //     customer: '共同リネンサプライ',
  //     title: '股下修理',
  //     totalQuantity: 30,
  //     price: 500,
  //     deliveryPlace: '配送センター',
  //     deadline: '2023-04-26',
  //   },
  //   {
  //     id: '00003',
  //     status: 'TOKUSHIMA',
  //     staff: '向井',
  //     customer: '総合開発',
  //     title: 'ワッペン付け',
  //     totalQuantity: 30,
  //     price: 500,
  //     deliveryPlace: '配送センター',
  //     deadline: '2023-04-26',
  //   },
  //   {
  //     id: '00002',
  //     status: 'TRANSFER',
  //     staff: '向井',
  //     customer: '総合開発',
  //     title: 'ワッペン付け',
  //     totalQuantity: 30,
  //     price: 500,
  //     deliveryPlace: '配送センター',
  //     deadline: '2023-04-26',
  //   },
  //   {
  //     id: '00001',
  //     status: 'WAREHOUSE',
  //     staff: '向井',
  //     customer: '総合開発',
  //     title: 'ワッペン付け',
  //     totalQuantity: 30,
  //     price: 500,
  //     deliveryPlace: '配送センター',
  //     deadline: '2023-04-26',
  //   },
  // ];

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'WAREHOUSE':
        return <Badge color="orange">倉庫</Badge>;
      case 'TRANSFER':
        return <Badge color="green">転送中</Badge>;
      case 'TOKUSHIMA':
        return <Badge color="violet">徳島工場</Badge>;
      case 'FACTORY':
        return <Badge color="violet">外注工場</Badge>;
      case 'START':
        return <Badge color="red">加工中</Badge>;
      case 'END':
        return <Badge color="indigo">完成</Badge>;
    }
  };

  const rows = data?.map((repaire) => (
    <tr key={repaire.id}>
      <td>
        <RepaireModal />
      </td>
      <td>{getBadgeColor('WAREHOUSE')}</td>
      <td>{repaire.id}</td>
      <td>{repaire.user_id}</td>
      <td>{repaire.customer}</td>
      <td>{Array.isArray(repaire?.repair_contents) && repaire?.repair_contents?.map((content: any) => (
        <Box key={content.id}>{content.title}</Box>
      ))}</td>
      <td>{repaire.deliveryPlace}</td>
      <td>{repaire.deadline}</td>
    </tr>
  ));
  return (
    <Paper
      w="100%"
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      sx={{ overflow: 'auto' }}
    >
      <Table
        horizontalSpacing="xs"
        verticalSpacing="xs"
        fontSize="xs"
        w={{ base: '1000px', md: '100%' }}
      >
        <thead>
          <tr>
            <th>詳細 </th>
            <th>ステータス </th>
            <th>伝票ナンバー </th>
            <th>担当</th>
            <th>顧客名</th>
            <th>修理内容</th>
            <th>数量</th>
            <th>単価</th>
            <th>合計</th>
            <th>納品先</th>
            <th>予定納期</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default Repairs;
