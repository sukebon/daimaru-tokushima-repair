import { Badge, Box, Flex, Image, Paper, Stack } from '@mantine/core';
import React from 'react';
import { NextPage } from 'next';
import { useQueryTemplate } from '@/hooks/templates/useQueryTemplate';
import { useRouter } from 'next/router';

const RepairTemplateId: NextPage = () => {
  const router = useRouter();
  const id = router.asPath.split('/').pop() || '';
  const { data } = useQueryTemplate(id);
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
      <Stack spacing="md">
        {data?.image_url && (
          <Image src={data?.image_url} w="100%" alt={data.title} />
        )}
        <Box>
          <Badge size="lg">
            {!Array.isArray(data?.repair_categories) &&
              data?.repair_categories?.name}
          </Badge>
        </Box>
        <Flex gap={24}>
          <Box>加工場</Box>
          <Box>{!Array.isArray(data?.factories) && data?.factories?.name}</Box>
        </Flex>
        <Flex gap={24}>
          <Box>修理名</Box>
          <Box>{data?.title}</Box>
        </Flex>
        <Flex gap={24}>
          <Box>単価</Box>
          <Box>{data?.price}円</Box>
        </Flex>
        <Flex gap={24}>
          <Box>担当</Box>
          <Box>
            {!Array.isArray(data?.profiles) && data?.profiles?.username}
          </Box>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default RepairTemplateId;
