import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
import Team from '../database/models/TeamsModel';
import TeamService from '../services/TeamService'

// import { Response } from 'superagent';
import { Model } from 'sequelize';

// chai.use(chaiHttp);

const { expect } = chai;

describe('Test readAll in TeamsService', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  afterEach(function () {
    sinon.restore();
  })

  it('Should return a array of teams', async() => {

    const mockOutput: Team[] = [new Team({
      id: 1,
      teamName: 'Bahia',
    })]

    sinon.stub(Model, 'findAll').resolves(mockOutput);
    const service = new TeamService();
    const result = await service.readAll();

    expect(result).to.be.equal(mockOutput);
  });
});
