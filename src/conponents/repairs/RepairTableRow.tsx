import React, { FC } from 'react';
import { RepaireModal } from './RepaireModal';
import { Badge, Box, Text } from '@mantine/core';
import { Repair } from '../../../types';

type Props = {
  repair: Repair;
};

export const RepairTableRow: FC<Props> = ({ repair }) => {
  const getTotalQuantity = (arr: { quantity: number }[]) => {
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
    <tr>
      <td>
        <RepaireModal repair={repair} />
      </td>
      <td>{getBadgeColor('WAREHOUSE')}</td>
      <td>{repair.id}</td>
      <td>{!Array.isArray(repair?.profiles) && repair?.profiles?.username}</td>
      <td>{repair.customer}</td>
      <td>
        {Array.isArray(repair?.repair_contents) &&
          repair?.repair_contents?.map((content) => (
            <Box component="span" key={content.id}>
              {content?.title}
            </Box>
          ))}
      </td>
      <td>
        {Array.isArray(repair?.repair_contents) &&
          repair?.repair_contents?.map((content) => (
            <Box component="span" key={content.id}>
              {content.price}
            </Box>
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
  );
};
