import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase/sever';
import { UserType } from '../../../../types/Users';

type Data = {
  users: UserType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const querySnapshot = await db.collection('users').get();
    const users = querySnapshot.docs.map((doc) => (
      { ...doc.data(), id: doc.id } as UserType
    ));
    return res.status(200).json({ users });
  }
}