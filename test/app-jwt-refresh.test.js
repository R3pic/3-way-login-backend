import request from "supertest";
import { app } from "../src/app.js";
import { UserData } from "../src/users/users.data.js";

describe("회원가입 라우터 /signup POST", () => {

    it("회원가입 성공", async () => {
        const response = await request(app).post("/signup").send({
            "username": "test",
            "password": "test1234"
        });

        expect(response.body).toEqual({ message: "회원가입 성공" });
        expect(response.status).toBe(201);
        expect(UserData.hasUser("test")).toBe(true);
    });

    it("이미 존재하는 회원", async () => {
        const response = await request(app).post("/signup").send({
            "username": "test",
            "password": "test1234"
        });

        expect(response.body).toEqual({ message: "이미 존재하는 회원입니다." });
        expect(response.status).toBe(409);
    });
});

describe("로그인 라우터 /login POST", () => {

    it('가입되지 않은 회원', async () => {
        const response = await request(app).post('/login').send({
            "username": "test2",
            "password": "test1234"
        });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: "가입되지 않은 회원입니다." });
    });

    it('비밀번호가 틀린 경우', async () => {
        const response = await request(app).post('/login').send({
            "username": "test",
            "password": "test12345"
        });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: "비밀번호가 틀렸습니다." });
    });

    it('로그인 성공', async () => {
        const response = await request(app).post('/login').send({
            "username": "test",
            "password": "test1234"
        });
        expect(response.status).toBe(200);
        expect(response.headers['set-cookie']).toHaveLength(2);
        expect(response.headers['set-cookie'][0]).toContain('access_token=');
        expect(response.headers['set-cookie'][1]).toContain('refresh_token=');
        expect(response.body).toEqual({ message: "로그인 성공" });
    });
});

describe("인덱스 라우터 ( 인증 검증용 )", () => {
    let access_token;
    let refresh_token;

    beforeAll(async () => {
        const response = await request(app).post('/login').send({
            "username": "test",
            "password": "test1234"
        });

        access_token = response.headers['set-cookie'][0].split('=')[1];
        refresh_token = response.headers['set-cookie'][1].split('=')[1];
    });

    it('액세스 토큰이 존재하지 않고, 리프레시 토큰도 없는 경우', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: "액세스 토큰이 존재하지 않습니다. 로그인이 필요합니다."});
    });

    it('액세스 토큰이 존재하지 않고, 리프레시 토큰이 유효하지 않은 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', ['refresh_token=invalid_token']);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: "리프레시 토큰이 유효하지 않습니다. 로그인이 필요합니다."});
    });

    it('액세스 토큰이 존재하지 않고, 리프레시 토큰이 유효한 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', [`refresh_token=${refresh_token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message : "안녕하세요! test님! Payload에 저장된 데이터 : 새로 발급받은 액세스 토큰" });
    });

    it('액세스 토큰이 유효하지 않고, 리프레시 토큰도 없는 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', ['access_token=invalid_token']);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: "액세스 토큰이 유효하지 않습니다. 로그인이 필요합니다."});
    });

    it('액세스 토큰이 유효하지 않고, 리프레시 토큰도 유효하지 않은 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', ['access_token=invalid_token', 'refresh_token=invalid_token']);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: '리프레시 토큰이 유효하지 않습니다. 로그인이 필요합니다.' });
    });

    it('액세스 토큰이 유효하지 않고, 리프레시 토큰이 유효한 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', ['access_token=invaild_token', `refresh_token=${refresh_token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message : "안녕하세요! test님! Payload에 저장된 데이터 : 새로 발급받은 액세스 토큰" });
    });

    it('액세스 토큰이 유효한 경우', async () => {
        const response = await request(app).get('/')
            .set('Cookie', [`access_token=${access_token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message : "안녕하세요! test님! Payload에 저장된 데이터 : 내가 넣고 싶은 데이터" });
    });

});