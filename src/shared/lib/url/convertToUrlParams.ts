export const convertToUrlSearchParams = <TParams extends Record<string, unknown>>(
  filters: TParams,
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  });

  return params;
};
