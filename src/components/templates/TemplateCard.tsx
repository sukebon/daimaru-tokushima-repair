import { useMutateTemplate } from '@/hooks/templates/useMutateTemplate';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

type Props = {
  template: {
    id: string;
    title: string;
    price: number;
    image_url: string | null;
    profiles:
      | {
          username: string | null;
        }
      | {
          username: string | null;
        }[]
      | null;
    repair_categories:
      | {
          name: string;
        }
      | {
          name: string;
        }[]
      | null;
    factories:
      | {
          name: string;
        }
      | {
          name: string;
        }[]
      | null;
  };
  pageType?: string;
  selectContent?: any;
  rowIndex?: number;
};

export const TemplateCard: FC<Props> = ({
  template,
  pageType,
  selectContent,
  rowIndex,
}) => {
  const { deleteTemplateMutation } = useMutateTemplate();

  const deleteTemplate = async (id: string) => {
    const result = window.confirm('削除して宜しいでしょうか');
    if (!result) return;
    deleteTemplateMutation.mutate(id);
  };
  return (
    <Card w="100%" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {template.image_url ? (
          <Image src={template.image_url} height={200} alt="Norway" />
        ) : (
          <Image
            src="/images/noimage.png"
            height={200}
            alt="noimage"
            sx={{ backgroundColor: '#f4f4f4' }}
          />
        )}
      </Card.Section>

      <Group position="apart" mt="sm" mb="xs">
        <Badge color="gray" variant="outline">
          {!Array.isArray(template.repair_categories) &&
            template?.repair_categories?.name}
        </Badge>
      </Group>
      <Flex align="center">
        <Text w="70px" fz="xs" color="gray">
          FACTORY
        </Text>
        <Text fz="sm">
          {!Array.isArray(template.factories) && template?.factories?.name}
        </Text>
      </Flex>
      <Flex align="center">
        <Text w="70px" fz="xs" color="gray">
          TITLE
        </Text>
        <Text fz="sm">{template.title}</Text>
      </Flex>
      <Flex align="center">
        <Text w="70px" fz="xs" color="gray">
          PRICE
        </Text>
        <Box fz="sm">{template.price}円</Box>
      </Flex>
      <Flex align="center">
        <Text w="70px" fz="xs" color="gray">
          AUTHOR
        </Text>
        <Box fz="sm">
          {!Array.isArray(template.profiles) && template?.profiles?.username}
        </Box>
      </Flex>
      {/* <Text size="xs" color="dimmed">
        コメント
      </Text> */}
      {pageType === 'drawer' ? (
        <Button
          color="teal"
          w="100%"
          mt="md"
          radius="md"
          onClick={() =>
            selectContent(rowIndex, {
              title: template.title,
              price: template.price,
              image_url: template.image_url,
            })
          }
        >
          選択
        </Button>
      ) : (
        <Flex gap="sm" align="center" mt="md">
          <Box w="100%">
            <Link href={`/templates/${template.id}`}>
              <Button color="teal" w="100%">
                詳細
              </Button>
            </Link>
          </Box>
          <Button color="gray" variant="default">
            <FaEdit />
          </Button>
          <Button
            onClick={() => deleteTemplate(template.id)}
            color="gray"
            variant="default"
          >
            <FaTrashAlt />
          </Button>
        </Flex>
      )}
    </Card>
  );
};
