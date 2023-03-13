import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Model } from 'sequelize';


const { expect } = chai;

chai.use(chaiHttp);

describe('Matches Integration Tests', function(){
  
  const app = new App();

  afterEach(function () {
    sinon.restore();
  })

  it('should return all Matches', async function() {
    const outputMock = [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
    ];

    sinon.stub(Model, 'findAll').resolves();
    const response = await chai.request(app.app).get('/matches');
    expect(response.status).to.be.equal(200);
  })
})