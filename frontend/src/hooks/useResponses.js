import useApi from './useApi';
import { fetchResponses } from '../services/responseService';

export function useResponses() {
  return useApi(fetchResponses, false);
}
