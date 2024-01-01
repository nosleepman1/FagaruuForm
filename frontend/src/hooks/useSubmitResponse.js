import useApi from './useApi';
import { submitResponse } from '../services/responseService';

export function useSubmitResponse() {
  return useApi(submitResponse, false);
}
