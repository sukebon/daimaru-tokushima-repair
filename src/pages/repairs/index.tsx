import { RepaireModal } from '@/conponents/repair/RepaireModal';
import { Paper } from '@mantine/core';
import { Table } from '@mantine/core';

const Repairs = () => {
  const repaires = [
    {
      id: '00001',
      staff: '向井',
      client: '共同リネンサプライ',
      title: '股下修理',
      totalQuantity: 30,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
    {
      id: '00002',
      staff: '向井',
      client: '総合開発',
      title: 'ワッペン付け',
      totalQuantity: 30,
      deliveryPlace: '配送センター',
      deadline: '2023-04-26',
    },
  ];
  const rows = repaires.map((repaire) => (
    <tr key={repaire.id}>
      <td>
        <RepaireModal />
      </td>
      <td>{repaire.id}</td>
      <td>{repaire.staff}</td>
      <td>{repaire.client}</td>
      <td>{repaire.title}</td>
      <td>{repaire.totalQuantity}</td>
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
            <th>伝票ナンバー </th>
            <th>担当</th>
            <th>顧客名</th>
            <th>修理内容</th>
            <th>数量</th>
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
