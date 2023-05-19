import {
  Button,
  TextInput,
  Flex,
  Paper,
  Stack,
  Autocomplete,
  Textarea,
  Radio,
  Group,
} from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { RepairInputs } from '../../../types';
import useStore from '../../../store';
import useRepaireStore from '../../../store/useRepaireStore';
import { RepaireStepper } from '@/conponents/repairs/RepaireStepper';
import { RepaireConfirm } from '@/conponents/repairs/new/RepaireConfirm';
import { RepaireComplete } from '@/conponents/repairs/new/RepaireComplete';
import { FactoryModal } from '@/conponents/repairs/FactoryModal';
import { RepairFormContents } from '@/conponents/repairs/new/RepairFormContents';
import { RepairFormDetails } from '@/conponents/repairs/new/RepairFormDetails';
import { Divider } from '@mantine/core';
import { useMutateRepair } from '@/hooks/repairs/useMutateRepair';

const RepairNew = () => {
  const session = useStore((state) => state.session);
  const [factory, setFactory] = useState({
    id: 'c7e7fa95-5949-420b-a7df-9185560b7990',
    name: '徳島工場',
  });
  const repair = useRepaireStore((state) => state.repair);
  const setRepaire = useRepaireStore((state) => state.setRepair);
  const resetRepair = useRepaireStore((state) => state.resetRepair);
  const { createRepairMutation } = useMutateRepair();

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const {
    getValues,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RepairInputs>({
    defaultValues: {
      ...repair,
      user_id: session?.user.id,
    },
  });
  const onSubmit: SubmitHandler<RepairInputs> = (data) => {
    console.log(data);
    nextStep();
    setRepaire({ ...data, factories: { id: factory.id, name: factory.name } });
  };

  return (
    <Paper
      w="100%"
      maw="1050px"
      shadow="md"
      radius="md"
      p="lg"
      m="auto"
      withBorder
    >
      <Flex p={24} justify="center">
        <RepaireStepper active={active} />
      </Flex>
      {active === 1 && (
        <>
          <Group position="center" mt="xl">
            <Button.Group buttonBorderWidth={1}>
              <Button variant="outline" size="xs" color="teal">
                ノート貼付
              </Button>
            </Button.Group>
          </Group>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px' }}>
            <Stack w="100%">
              <Flex
                w="100%"
                gap={16}
                sx={{ flexDirection: 'column' }}
                direction={{ sm: 'row' }}
              >
                <Flex gap={6} align="end" w="100%" maw={{ md: '350px' }}>
                  <FactoryModal factory={factory} setFactory={setFactory} />
                </Flex>
                <Autocomplete
                  w="100%"
                  maw={{ md: '500px' }}
                  label="納入先"
                  required
                  defaultValue={repair?.deliveryPlace}
                  {...register('deliveryPlace', { required: true })}
                  onChange={getValues}
                  data={['配送センター', 'ウィルフィット', '神戸店']}
                />
                <Flex gap={16} align="center">
                  <TextInput
                    type="date"
                    w="100%"
                    label="納期"
                    {...register('deadline')}
                  />
                </Flex>
              </Flex>
              <Flex
                gap={16}
                sx={{ flexDirection: 'column' }}
                direction={{ sm: 'row' }}
              >
                <TextInput
                  w="100%"
                  label="顧客名"
                  maw={{ md: '350px' }}
                  required
                  {...register('customer', { required: true })}
                />
                <Radio.Group
                  withAsterisk
                  label="入荷場所"
                  defaultValue={repair?.status}
                >
                  <Group mt="xs">
                    <Radio
                      color="teal"
                      value="PICKING"
                      label="倉庫入れ"
                      {...register('status', { required: true })}
                    />
                    <Radio
                      color="teal"
                      value="DIRECT"
                      label="工場直送"
                      {...register('status', { required: true })}
                    />
                  </Group>
                </Radio.Group>
              </Flex>
            </Stack>
            <Divider
              mt={50}
              mb={10}
              variant="dashed"
              label="修理内容"
              labelPosition="center"
            />
            <RepairFormContents
              register={register}
              control={control}
              getValues={getValues}
            />
            <Divider
              mt={50}
              variant="dashed"
              label="修理明細"
              labelPosition="center"
            />
            <RepairFormDetails
              register={register}
              control={control}
              getValues={getValues}
              errors={errors}
            />
            <Divider
              mt={50}
              mb={10}
              variant="dashed"
              label="修理コメント"
              labelPosition="center"
            />
            <Textarea
              placeholder="コメント"
              label="コメント"
              size="sm"
              maw="1040px"
              minRows={5}
              autosize
              {...register('comment')}
            />
            <Group position="center" mt="xl">
              <Button color="teal" type="submit" sx={{ mt: 6 }}>
                確認画面へ
              </Button>
            </Group>
          </form>
        </>
      )}
      {active === 2 && (
        <>
          <RepaireConfirm />
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              戻る
            </Button>
            <Button
              color="teal"
              onClick={() => {
                createRepairMutation.mutate(repair);
                nextStep();
                resetRepair();
              }}
            >
              確定
            </Button>
          </Group>
        </>
      )}
      {active === 3 && <RepaireComplete />}
    </Paper>
  );
};

export default RepairNew;
