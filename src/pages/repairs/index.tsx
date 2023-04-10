import { Paper } from "@mantine/core";
import { Table } from '@mantine/core';

const Repairs = () => {
  const elements = [
    {
      id: "00001",
      staff: "向井",
      title: "股下修理",
      totalQuantity: 30,
      deadline: "2023-04-26",
    }
  ];
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.staff}</td>
      <td>{element.title}</td>
      <td>{element.totalQuantity}</td>
      <td>{element.deadline}</td>
    </tr>
  ));
  return (
    <Paper
      w="100%"
      shadow="md"
      radius="md"
      p="lg"
      withBorder
    ><Table horizontalSpacing="sm" verticalSpacing="xs" fontSize="md">
        <thead>
          <tr>
            <th>伝票ナンバー </th>
            <th>担当</th>
            <th>タイトル</th>
            <th>数量</th>
            <th>予定納期</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table></Paper>
  );
};

export default Repairs;