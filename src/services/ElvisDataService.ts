import axios from 'axios';
import { Variable } from '../data/Types';

const API_URL = 'https://metadata.kreftregisteret.no/rest/v1/variables'; 

interface VariableData {
  variableList: Variable[];
}

interface VariableListResponse {
  data: VariableData;
  variableList: Variable[];
}

export default class ElvisDataService {
  static async getVariablesList(limit = 2000, offset = 0): Promise<Variable[]> {
    try {
      const response = await axios.get<VariableListResponse>(
        `${API_URL}/:filtered/?limit=${limit}&offset=${offset}`
      );
      return response.data.variableList; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error fetching variables:", error.response?.data || error.message);
        throw new Error("Failed to fetch variable list.");
      } else {
        console.error("Unexpected error fetching variables:", error);
        throw error; 
      }
    }
  }

  static async getVariableDetails(id: number): Promise<VariableData | null> {
    try {
      const response = await axios.get<VariableData>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn("Variable not found:", id);
          return null; 
        } else {
          console.error("Axios Error fetching variable details:", error.response?.data || error.message);
        }
      } else {
        console.error("Unexpected error fetching variable details:", error);
      }
      throw new Error("Failed to fetch variable details."); 
    }
  }
}
