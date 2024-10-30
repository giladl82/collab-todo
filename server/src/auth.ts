import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { JWT_SECRET } from './consts';
import { users, type User } from './data';

const loadUser = (email: string) => {
  return users.find(
    (u) => u.email.toLocaleLowerCase() === email.toLocaleLowerCase()
  );
};

export const getUser = (token: string) => {
  try {
    const user = jsonwebtoken.verify(token, JWT_SECRET) as User;
    return user;
  } catch (error) {
    return null;
  }
};

const router = Router();

router.post('/auth', (req, res) => {
  const { email } = req.body;
  const user = loadUser(email);

  if (user) {
    const token = jsonwebtoken.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user });
    return;
  }
  
  res.status(401).send('Invalid credentials');
});

router.get('/auth', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  const user = getUser(token as string);
  res.json(user);
});

export { router as authRouter };
