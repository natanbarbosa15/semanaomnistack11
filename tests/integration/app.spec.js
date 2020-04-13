const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG, Session and Incident', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APADTeste",
                email: "contato@contato.com.br",
                whatsapp: "4700000000",
                city: "Rio do Sul",
                state: "SC"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to list created ONG', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .get('/ongs');

        expect(response.body).toEqual([{
            id: ongTest.id,
            name: "APADTeste",
            email: "contato@contato.com.br",
            whatsapp: "4700000000",
            city: "Rio do Sul",
            state: "SC"
        }]);
    });

    it('should be able to create a Login session', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .post('/sessions')
            .send({
                id: ongTest.id
            });
            
        expect(response.body).toHaveProperty('name');
    });

    it('should be able to create an Incident', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', ongTest.id)
            .send({
                title: "Teste",
                description: "Teste",
                value: 1200
            });

        expect(response.body).toHaveProperty('id');
    });

    it('should be able to list created Incident', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .get('/incidents');

        expect(response.body).toEqual([{
            id: 1,
            title: "Teste",
            description: "Teste",
            value: 1200,
            ong_id: ongTest.id,
            name: "APADTeste",
            email: "contato@contato.com.br",
            whatsapp: "4700000000",
            city: "Rio do Sul",
            state: "SC"
        }]);
    });

    it('should be able to list created Incident in ONG profile', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .get('/profile')
            .set('Authorization', ongTest.id);

        expect(response.body).toEqual([{
            id: 1,
            title: "Teste",
            description: "Teste",
            value: 1200,
            ong_id: ongTest.id
        }]);
    });

    it('should be able to delete an Incident', async () => {
        const ongTest = await connection('ongs').select('*').first();
        
        const response = await request(app)
            .delete('/incidents/1')
            .set('Authorization', ongTest.id);
        
        expect(response.statusCode).toBe(204);
    });
});