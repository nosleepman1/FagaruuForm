import useApi from './useApi';
import { fetchResponseById } from '../services/responseService';

export function useResponseDetail() {
  return useApi(fetchResponseById, false);
}
