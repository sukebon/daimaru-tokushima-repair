import { RepaireModal } from '@/conponents/repairs/RepaireModal';
import { useQueryRepairs } from '@/hooks/repairs/useQueryRepairs';
import { Badge, Box, Paper } from '@mantine/core';
import { Table } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';

const Repairs: NextPage = () => {
  const { data, isLoading } = useQueryRepairs();

  const getTotalQuantity = (arr: { quantity: number | null; }[]) => {
    let total = 0;
    arr.forEach((value) => (total += value.quantity || 0));
    return total;
  };

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
            <th>単価</th>
            <th>数量</th>
            <th>合計</th>
            <th>納品先</th>
            <th>予定納期</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((repair) => (
            <tr key={repair?.id}>
              <td>
                <RepaireModal repair={repair} />
              </td>
              <td>{getBadgeColor('WAREHOUSE')}</td>
              <td>{repair.id}</td>
              <td>
                {!Array.isArray(repair?.profiles) && repair?.profiles?.username}
              </td>
              <td>{repair.customer}</td>
              <td>
                {Array.isArray(repair?.repair_contents) &&
                  repair?.repair_contents?.map((content) => (
                    <React.Fragment key={content.id}>
                      {content?.title}
                    </React.Fragment>
                  ))}
              </td>
              <td>
                {Array.isArray(repair?.repair_contents) &&
                  repair?.repair_contents?.map((content) => (
                    <React.Fragment key={content.id}>
                      {content.price}
                    </React.Fragment>
                  ))}
              </td>
              <td>
                {Array.isArray(repair?.repair_details) &&
                  getTotalQuantity(repair?.repair_details)}
              </td>
              <td>{repair.deadline}</td>
              <td>{repair.deliveryPlace}</td>
              <td>{repair.deadline}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Paper>
  );
};

export default Repairs;
