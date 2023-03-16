import Link from "next/link";
import React from "react";

type Props = {
  result: any;
  meta: any;
};

export var res: any = [];

function Transpose(matrix: any, n: any) {
  if (matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        const tmp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = tmp;
      }
    }
  }
  matrix.splice(n, matrix.length - n);

  return matrix;
}

function LogBuilder({ result, meta }: Props) {
  if (meta) var d: any = meta.length;
  res = Transpose(result, d);

  return res;
}

export default LogBuilder;
