import { RepairEdit } from '@/conponents/repairs/RepairEdit';
import { useQueryRepair } from '@/hooks/repairs/useQueryRepair';
import { useQueryRepairNext } from '@/hooks/repairs/useQueryRepairNext';
import { useQueryRepairPrev } from '@/hooks/repairs/useQueryRepairPrev';
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Paper,
  Stack,
  Stepper,
  Table,
  createStyles,
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Repair: NextPage = () => {
  const router = useRouter();
  const repairId = router.asPath.split('/').pop() || '';
  const { data: repair } = useQueryRepair(repairId);
  const { data: prev } = useQueryRepairPrev(repairId);
  const prevpage = prev?.find((_, i) => i === 0) || '';
  const { data: next } = useQueryRepairNext(repairId);
  const nextpage = next?.find((_, i) => i === 0) || '';
  const [active, setActive] = useState(1);
  const { classes } = useStyles();

  const getBadgeColor = (status: string = '') => {
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
      default:
        break;
    }
  };

  return (
    <Paper
      w="100%"
      maw="850px"
      shadow="md"
      radius="md"
      p="lg"
      m="auto"
      withBorder
    >
      <RepairEdit repairId={repair?.id} />
      <Stepper mt="md" color="teal" size="xs" active={active} breakpoint="md">
        <Stepper.Step label="倉庫" description="Picking" />
        <Stepper.Step label="工場直送" description="Direct" />
        <Stepper.Step label="作業A" description="a" />
        <Stepper.Step label="作業B" description="b" />
        <Stepper.Step label="作業C" description="c" />
      </Stepper>

      <Stack mt={24}>
        {getBadgeColor(repair?.status)}
        <Flex
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'none', md: 'space-between' }}
        >
          <Box>
            <Box fz="xs">伝票ナンバー</Box>
            <Box>{repair?.id}</Box>
          </Box>
          <Box>
            <Box fz="xs">担当</Box>
            <Box fz="md">
              {!Array.isArray(repair?.profiles) && repair?.profiles?.username}
            </Box>
          </Box>
        </Flex>
        <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Box fz="xs">工場名</Box>
            <Box fz="md">
              {!Array.isArray(repair?.factories) && repair?.factories?.name}
            </Box>
          </Box>
          <Box>
            <Box fz="xs">希望納期</Box>
            <Box fz="md">{repair?.deadline}</Box>
          </Box>
          <Box>
            <Box fz="xs">出荷先</Box>
            <Box fz="md">{repair?.deliveryPlace}</Box>
          </Box>
          <Box>
            <Box fz="xs">顧客名</Box>
            <Box fz="md">{repair?.customer}</Box>
          </Box>
        </Flex>
        <Box sx={{ overflowX: 'auto' }}>
          <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="xs"
            withBorder
            withColumnBorders
            miw={600}
            maw="auto"
          >
            <thead>
              <tr className={classes.tr}>
                <th style={{ textAlign: 'center' }}>修理名</th>
                <th style={{ width: '80px', textAlign: 'center' }}>単価</th>
                <th style={{ width: '80px', textAlign: 'center' }}>区分</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(repair?.repair_contents) &&
                repair?.repair_contents.map((content) => (
                  <tr key={content.id}>
                    <td>{content.title}</td>
                    <td style={{ textAlign: 'right' }}>
                      {content.price || 0}円
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {content?.is_new ? '新規' : '前回通り'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Table
            mt="md"
            horizontalSpacing="xs"
            verticalSpacing="xs"
            fontSize="xs"
            miw={600}
            maw="auto"
            withBorder
            withColumnBorders
          >
            <thead>
              <tr className={classes.tr}>
                <th style={{ textAlign: 'center' }}>商品名</th>
                <th style={{ width: '60px', textAlign: 'center' }}>サイズ</th>
                <th style={{ width: '60px', textAlign: 'center' }}>数量</th>
                <th style={{ textAlign: 'center' }}>備考</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(repair?.repair_details) &&
                repair?.repair_details?.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.product_name}</td>
                    <td style={{ textAlign: 'center' }}>{detail.size} </td>
                    <td style={{ textAlign: 'right' }}>{detail.quantity}</td>
                    <td>{detail?.comment}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Box>

        <Box>
          <Box fz="xs">コメント</Box>
          <Box>{repair?.comment}</Box>
        </Box>
      </Stack>
      <Flex justify="center">
        <Button.Group>
          {prevpage && (
            <Link href={`/repairs/${prevpage.id}`}>
              <Button color="teal" radius={0} variant="default">
                <FaAngleLeft />
              </Button>
            </Link>
          )}
          <Link href={`/repairs`}>
            <Button color="teal" radius={0} variant="default">
              一覧へ
            </Button>
          </Link>
          {nextpage && (
            <Link href={`/repairs/${nextpage.id}`}>
              <Button color="teal" radius={0} variant="default">
                <FaAngleRight />
              </Button>
            </Link>
          )}
        </Button.Group>
      </Flex>
    </Paper>
  );
};

export default Repair;

const useStyles = createStyles((theme) => ({
  tr: {
    backgroundColor:
      theme.colorScheme === 'light'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
}));
