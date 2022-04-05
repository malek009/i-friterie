
import {  onlineFirst } from "../helpers/serviceHelpers";
import IFriterie from "../models/iFriterie";
import friterieRepository from '../repositories/friterieRepository';
import friterieService from '../services/friterieService';

class FriterieFacade {
    public async getAll() : Promise<IFriterie[]> {
        return onlineFirst<IFriterie[]>(
            friterieRepository.getAll,
            friterieService.getAll,
            (friteries) => {
                friterieRepository.bulkAdd(friteries);
            });
    }
    public async add(friterie: IFriterie) : Promise<void> {
        return ;
    }
}

const friterieFacade = new FriterieFacade();
export default friterieFacade;