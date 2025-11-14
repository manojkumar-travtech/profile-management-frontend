export interface ApiResponse<TData = unknown, TError = unknown> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: TData;
  error?: TError;
}
