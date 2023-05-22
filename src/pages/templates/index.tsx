import { TemplateCard } from '@/components/templates/TemplateCard';
import { useQueryTemplates } from '@/hooks/templates/useQueryTemplates';
import { Grid, Paper } from '@mantine/core';
import React from 'react';

const RepairTemplates = () => {
  const { data } = useQueryTemplates();
  return (
    <Paper
      w="100%"
      maw="1000px"
      shadow="md"
      radius="md"
      p="lg"
      m="auto"
      withBorder
    >
      <Grid gutter="sm">
        {data?.map((template) => (
          <Grid.Col xs={12} sm={6} md={4} lg={4} xl={4} key={template?.id}>
            <TemplateCard template={template} />
          </Grid.Col>
        ))}
      </Grid>
    </Paper>
  );
};

export default RepairTemplates;
