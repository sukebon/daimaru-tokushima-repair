import { useQueryRepairs } from '@/hooks/repairs/useQueryRepairs';
import { Badge, Box, Button, Paper } from '@mantine/core';
import { Table } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { createStyles } from '@mantine/core';

const Repairs: NextPage = () => {
  const { data, isLoading } = useQueryRepairs();
  const { classes } = useStyles();

  const getTotalQuantity = (arr: { quantity: number | null }[]) => {
    let total = 0;
    arr.forEach((value) => (total += Number(value?.quantity) || 0));
    return total;
  };
  const getTotalPrice = (arr: { price: number | null }[]) => {
    let total = 0;
    arr.forEach((value) => (total += Number(value?.price) || 0));
    return total;
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'PICKING':
        return <Badge color="orange">倉庫入荷</Badge>;
      case 'DIRECT':
        return <Badge color="green">工場直送</Badge>;
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
        w={{ base: '1100px', md: '100%' }}
      >
        <thead>
          <tr>
            <th>詳細 </th>
            <th>ステータス</th>
            <th>伝票ナンバー</th>
            <th>担当</th>
            <th>顧客名</th>
            <th>修理内容</th>
            <th>単価</th>
            <th className={classes.th}>数量</th>
            <th>合計</th>
            <th>納品先</th>
            <th>予定納期</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data?.map((repair) => (
              <tr key={repair?.id}>
                <td>
                  <Link href={`/repairs/${repair.id}`}>
                    <Button size="xs" color="teal">
                      詳細
                    </Button>
                  </Link>
                </td>
                <td>{getBadgeColor(repair.status)}</td>
                <td>{repair.id}</td>
                <td>
                  {!Array.isArray(repair?.profiles) &&
                    repair?.profiles?.username}
                </td>
                <td>{repair.customer}</td>
                <td>
                  {Array.isArray(repair?.repair_contents) &&
                    repair?.repair_contents?.map((content) => (
                      <React.Fragment key={content.id}>
                        <Box>{content?.title}</Box>
                      </React.Fragment>
                    ))}
                </td>
                <td className={classes.td}>
                  {Array.isArray(repair?.repair_contents) &&
                    repair?.repair_contents?.map((content) => (
                      <React.Fragment key={content.id}>
                        <Box>{content?.price}円</Box>
                      </React.Fragment>
                    ))}
                </td>
                <td className={classes.td}>
                  {Array.isArray(repair?.repair_details) &&
                    getTotalQuantity(repair?.repair_details)}
                </td>
                <td className={classes.td}>
                  {Array.isArray(repair?.repair_contents) &&
                    repair?.repair_contents?.map((content) => (
                      <React.Fragment key={content.id}>
                        {Array.isArray(repair?.repair_details) && (
                          <Box>
                            {(content?.price || 0) *
                              getTotalQuantity(repair?.repair_details)}
                            円
                          </Box>
                        )}
                      </React.Fragment>
                    ))}
                </td>
                <td>{repair.deliveryPlace}</td>
                <td>{repair.deadline}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  th: {
    width: '50px',
    padding: 0,
  },
  td: {
    textAlign: 'right',
  },
}));

export default Repairs;
