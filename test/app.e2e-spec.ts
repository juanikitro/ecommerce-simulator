import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'
import assert from 'assert'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	it('/auth/register (POST)', () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send({
				username: 'TestUser',
				email: 'test@gmail.com',
				password: 'Test123',
				roles: 'user',
			})
			.expect(201)
	})
})
