import { Badge, Box, Button, Card, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

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
        <Text>{template.title}</Text>
        <Badge color="pink" variant="light">
          {!Array.isArray(template.repair_categories) &&
            template?.repair_categories?.name}
        </Badge>
      </Group>
      <Box>{template.price}</Box>
      <Text size="xs" color="dimmed">
        コメント
      </Text>
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
        <Link href={`/templates/${template.id}`}>
          <Button color="teal" w="100%" mt="md" radius="md">
            詳細
          </Button>
        </Link>
      )}
    </Card>
  );
};
