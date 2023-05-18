import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const RepaireComplete = () => {
  return (
    <Flex align="center" direction="column">
      <FaCheckCircle color="gray" size={100} />
      <Group position="center" mt="xl">
        <Link href="/repairs">
          <Button color="teal">修理一覧へ</Button>
        </Link>
      </Group>
    </Flex>
  );
};
