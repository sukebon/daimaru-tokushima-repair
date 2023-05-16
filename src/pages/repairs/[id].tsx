import { useQueryRepair } from '@/hooks/repairs/useQueryRepair';
import { useQueryRepairNext } from '@/hooks/repairs/useQueryRepairNext';
import { useQueryRepairPrev } from '@/hooks/repairs/useQueryRepairPrev';
import { Badge, Box, Button, Flex, Paper, Stack, Table } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Repair: NextPage = () => {
  const router = useRouter();
  const repairId = (router.asPath.split('/').pop() || '');
  const { data: repair } = useQueryRepair(repairId);
  const { data: prev } = useQueryRepairPrev(repairId);
  const prevpage = prev?.find((_, i) => i === 0) || "";
  const { data: next } = useQueryRepairNext(repairId);
  const nextpage = next?.find((_, i) => i === 0) || "";

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
      <Stack>
        <Badge color="teal" size="lg">
          倉庫
        </Badge>
        <Flex
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'none', md: 'space-between' }}
        >
          <Box>
            <Box fz="xs">伝票ナンバー</Box>
            <Box fz="md">{repair?.id}</Box>
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
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={{ textAlign: 'center' }}>修理名</th>
              <th style={{ width: '80px', textAlign: 'center' }}>単価</th>
              <th style={{ width: '80px', textAlign: 'center' }}>区分</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(repair?.repair_contents) &&
              repair?.repair_contents.map((content) => (
                <tr key={content.id} >
                  <td>{content.title}</td>
                  <td style={{ textAlign: 'right' }}>{content.price || 0}円</td>
                  <td style={{ textAlign: 'center' }}>
                    {content?.is_new ? '新規' : '前回通り'}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Table
          horizontalSpacing="xs"
          verticalSpacing="xs"
          fontSize="xs"
          miw={600}
          maw="auto"
          withBorder
          withColumnBorders
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
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

        <Box>
          <Box fz="xs">コメント</Box>
          <Box>{repair?.comment}</Box>
        </Box>
      </Stack>
      <Flex justify="center">
        <Button.Group>
          {prevpage && (
            <Link href={`/repairs/${prevpage.id}`}>
              <Button color="teal" radius={0} variant="default"><FaAngleLeft /></Button>
            </Link>
          )}
          <Link href={`/repairs`}>
            <Button color="teal" radius={0} variant="default">一覧へ</Button>
          </Link>
          {nextpage && (
            <Link href={`/repairs/${nextpage.id}`}>
              <Button color="teal" radius={0} variant="default"><FaAngleRight /></Button>
            </Link>
          )}
        </Button.Group>
      </Flex>
    </Paper>
  );
};

export default Repair;
