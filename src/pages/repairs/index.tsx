import { RepaireModal } from '@/conponents/repair/RepaireModal';
import { Badge, Paper } from '@mantine/core';
import { Table } from '@mantine/core';

const Repairs = () => {
  const repaires = [
    {
      id: '00005',
      status: 'END',
      staff: '向井',
      client: '共同リネンサプライ',
      title: '股下修理',
      totalQuantity: 30,
      price: 500,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
    {
      id: '00004',
      status: 'START',
      staff: '向井',
      client: '共同リネンサプライ',
      title: '股下修理',
      totalQuantity: 30,
      price: 500,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
    {
      id: '00003',
      status: 'TOKUSHIMA',
      staff: '向井',
      client: '総合開発',
      title: 'ワッペン付け',
      totalQuantity: 30,
      price: 500,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
    {
      id: '00002',
      status: 'TRANSFER',
      staff: '向井',
      client: '総合開発',
      title: 'ワッペン付け',
      totalQuantity: 30,
      price: 500,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
    {
      id: '00001',
      status: 'WAREHOUSE',
      staff: '向井',
      client: '総合開発',
      title: 'ワッペン付け',
      totalQuantity: 30,
      price: 500,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
  ];

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

  const rows = repaires.map((repaire) => (
    <tr key={repaire.id}>
      <td>
        <RepaireModal />
      </td>
      <td>{getBadgeColor(repaire.status)}</td>
      <td>{repaire.id}</td>
      <td>{repaire.staff}</td>
      <td>{repaire.client}</td>
      <td>{repaire.title}</td>
      <td>{repaire.totalQuantity}</td>
      <td>{repaire.price}</td>
      <td>{(repaire.price * repaire.totalQuantity).toLocaleString()}円</td>
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
