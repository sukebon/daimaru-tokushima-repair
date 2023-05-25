import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Group, Box, Image, Paper, Grid } from '@mantine/core';
import { useQueryTemplates } from '@/hooks/templates/useQueryTemplates';
import { TemplateCard } from './TemplateCard';
import { FC } from 'react';

type Props = {
  selectContent: any;
  rowIndex: number;
};

export const TemplateDrawer: FC<Props> = ({ selectContent, rowIndex }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useQueryTemplates();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="テンプレート"
        size="xl"
        position="right"
        zIndex={10000}
      >
        <Grid gutter="sm">
          {data?.map((template) => (
            <Grid.Col xs={12} sm={6} md={4} lg={4} xl={4} key={template?.id}>
              <TemplateCard
                template={template}
                pageType="drawer"
                selectContent={selectContent}
                rowIndex={rowIndex}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Drawer>

      <Group w="100%" position="center">
        <Button w="100%" color="teal" onClick={open}>
          テンプレート
        </Button>
      </Group>
    </>
  );
};
