import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Model } from 'sequelize';

import ITeam from '../interfaces/ITeam';
// import Team from '../../database/models/TeamsModel';
// import IServiceTeam from '../../interfaces/IServiceTeam';


const { expect } = chai;

chai.use(chaiHttp);

describe('Test route /teams', () => {
  
  const app = new App();

  afterEach(function () {
    sinon.restore();
  })
 
  it('Should return a array of teams on Get /teams', async() => {

    const outputMock: ITeam[] = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ];

    sinon.stub(Model, 'findAll').resolves();
    const response = await chai.request(app.app).get('/teams');
    expect(response.status).to.be.equal(200);

  });
});
