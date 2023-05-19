import React, { FC } from 'react';
import { PDFDocument, PageSizes, rgb } from 'pdf-lib';

import fontkit from '@pdf-lib/fontkit';
import { Button } from '@mantine/core';

type Props = {
  repairId: number | undefined;
};

export const RepairPDF: FC<Props> = ({ repairId }) => {
  const getPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([PageSizes.A4[1], PageSizes.A4[0]]);
    const { width, height } = page.getSize();
    const fontSize = 30;
    const array = ['123', '456', '789'];
    console.log(height);
    page.drawText(String(repairId));
    array.forEach((value, index) => {
      page.drawText(value, {
        x: 50,
        y: 550 - index * 20,
        size: 12,
      });
      page.drawLine({
        start: { x: 50, y: 700 - index * 20 },
        end: { x: 500, y: 700 - index * 20 },
      });
    });
    page.drawText('repair', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      color: rgb(0, 0.53, 0.71),
    });
    const pdfBytes = await pdfDoc.save();
    window.open(
      URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
    );
  };

  return (
    <Button color="teal" onClick={getPdf}>
      PDF
    </Button>
  );
};
