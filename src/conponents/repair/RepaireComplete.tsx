import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

export const RepaireComplete = () => {
  return (
    <Flex align="center" direction="column">
      <FaCheckCircle size={100} />
      <Group position="center" mt="xl">
        <Link href="/repairs">
          <Button color='teal' >一覧へ移動</Button>
        </Link>
      </Group>
    </Flex>

  );
};
