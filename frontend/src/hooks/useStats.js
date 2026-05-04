import useApi from './useApi';
import { fetchStats } from '../services/responseService';

export function useStats() {
  return useApi(fetchStats, false);
}
