import supertest from 'supertest';
import server from '@/app'

const app = () => supertest(server)

export default app;