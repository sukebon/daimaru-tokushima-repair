import { useQueryFactories } from '@/hooks/settings/useQueryFactories';
import {
  Box,
  Button,
  FileInput,
  Flex,
  Image,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../../../utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useMutateTemplate } from '@/hooks/templates/useMutateTemplate';
import { useQueryCategories } from '@/hooks/settings/useQueryCategories';
import { TemplateInputs } from '../../../types';

const Templatesnew = () => {
  const router = useRouter();
  const { data: categories } = useQueryCategories();
  const { data: factories } = useQueryFactories();
  const [factory, setFactory] = useState('');
  const [category, setCategory] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>();
  const { createTemplateMutation } = useMutateTemplate();
  const { register, handleSubmit, getValues } = useForm<TemplateInputs>();
  const onSubmit: SubmitHandler<TemplateInputs> = async (data) => {
    if (!factory) return;
    let imageUrl = null;
    if (uploadFile) {
      imageUrl = await addImage(uploadFile);
    }
    createTemplateMutation.mutate({
      ...data,
      factory_id: factory,
      category_id: category,
      image_url: imageUrl,
    });
    router.push('/templates');
  };

  const handleImageChange = (e: File | null) => {
    if (!e || e.length == 0) return;
    setUploadFile(e);
  };

  const addImage = async (e: File | null) => {
    if (!e || e.length == 0) {
      return;
    }
    const file = e;
    const uniqueId = uuidv4();
    const filePath = `/${uniqueId}`;
    const { error } = await supabase.storage
      .from('repairs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      console.log(error);
    }
    // 画像のURLを取得
    const { data } = supabase.storage.from('repairs').getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    return imageUrl;
  };

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
      <Box>修理・マークのテンプレートを作成する</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {factories && (
            <Select
              required
              label="工場名"
              placeholder="工場を選択してください"
              value={factory}
              onChange={(e: string) => setFactory(e)}
              data={factories?.map((factory) => ({
                value: factory.id,
                label: factory.name,
              }))}
            />
          )}
          <Flex gap="md">
            {categories && (
              <Select
                w="100%"
                required
                label="カテゴリー名"
                placeholder="カテゴリーを選択してください"
                value={category}
                onChange={(e: string) => setCategory(e)}
                data={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
            <TextInput w="100%" label="タグ名" {...register('tag')} />
          </Flex>
          <Flex gap="md">
            <TextInput
              w="100%"
              required
              label="修理名"
              {...register('title')}
            />
            <NumberInput
              label="価格"
              required
              {...register(`price`, {
                required: true,
              })}
              onChange={() => getValues()}
              max={1000000}
              min={0}
            />
          </Flex>
          <Textarea label="コメント" {...register('comment')} />
          <Flex
            gap="md"
            align={{ base: 'flex-start', sm: 'flex-end' }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <FileInput
              placeholder="修理・マーク伝票ファイル"
              label="ファイルをアップロード"
              withAsterisk
              value={uploadFile}
              onChange={handleImageChange}
            />
            {uploadFile && (
              <Button
                variant="outline"
                color="teal"
                onClick={() => setUploadFile(null)}
              >
                画像を取り消す
              </Button>
            )}
          </Flex>
          {uploadFile && (
            <>
              <Image
                src={URL.createObjectURL(uploadFile)}
                alt={uploadFile.name}
              />
            </>
          )}
          <Button type="submit" color="teal">
            登録
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Templatesnew;
