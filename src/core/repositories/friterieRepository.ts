import database from "../dexie";
import IFriterie from "../models/iFriterie";

class FriterieRepository {
    public async bulkAdd(friteries: IFriterie[]): Promise<void> {
        await database.friteries.bulkPut(friteries);
    }

    public async getAll(): Promise<IFriterie[]> {
        return await database.friteries.toArray();
    }
    public async add(friterie: IFriterie): Promise<void> {
        await database.friteries.add(friterie);
    }
}

const friterieRepository = new FriterieRepository();

export default friterieRepository;