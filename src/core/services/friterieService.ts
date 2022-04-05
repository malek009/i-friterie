import axios from 'axios';
import IFriterie from '../models/iFriterie';

const API_URL = "https://fakedatatechnocitemalek.azurewebsites.net/api";

class FriterieService {
    public async getAll(): Promise<IFriterie[]> {
        return (await axios.request<IFriterie[]>({url: API_URL + "/GetFriteries"})).data;
    }
    public async add(friterie: IFriterie): Promise<void> {
        await axios.request<void>({url: API_URL + "/AddFriterie", method: "POST", data: friterie});
    }
}

const friterieService = new FriterieService();
export default friterieService;