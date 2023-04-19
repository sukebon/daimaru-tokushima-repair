import { FC } from 'react';
import { Flex, Stepper } from '@mantine/core';

type Props = {
  active: number;
};

export const RepaireStepper: FC<Props> = ({ active }) => {
  return (
    <>
      <Stepper miw={{ md: 500 }} active={active} color="teal" breakpoint="sm">
        <Stepper.Step label="伝票入力" >
        </Stepper.Step>
        <Stepper.Step label="確認" >
        </Stepper.Step>
        <Stepper.Step label="登録完了">
        </Stepper.Step>
        <Stepper.Completed>
          <Flex w="100%" justify="center" fz="lg">修理伝票の登録が完了しました!</Flex>
        </Stepper.Completed>
      </Stepper>
    </>
  );
};
