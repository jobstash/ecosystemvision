import { FILTER_KIND } from '@/filters/core/constants';
import {
  FilterConfig,
  MultiSelectFilterConfig,
  SingleSelectFilterConfig,
} from '@/filters/core/schemas';

const SEARCH_QUERY_KEY = 'query';

// This gets param keys that are only from filter configs
export const sanitizeFilterParams = (
  rawSearchParams: string | Record<string, string>,
  filterConfigs: FilterConfig[],
) => {
  const urlParams = new URLSearchParams(rawSearchParams);
  const result = new URLSearchParams();

  // Preserve search query if present
  if (urlParams.has(SEARCH_QUERY_KEY)) {
    result.set(SEARCH_QUERY_KEY, urlParams.get(SEARCH_QUERY_KEY)!);
  }

  // Process each filter config to determine which params to preserve
  for (const config of filterConfigs) {
    switch (config.kind) {
      case FILTER_KIND.RANGE: {
        const {
          value: {
            lowest: { paramKey: minParamKey },
            highest: { paramKey: maxParamKey },
          },
        } = config;
        if (urlParams.has(minParamKey))
          result.set(minParamKey, urlParams.get(minParamKey)!);
        if (urlParams.has(maxParamKey))
          result.set(maxParamKey, urlParams.get(maxParamKey)!);
        break;
      }
      case FILTER_KIND.SINGLE_SELECT:
      case FILTER_KIND.MULTI_SELECT:
      case FILTER_KIND.MULTI_SELECT_WITH_SEARCH: {
        // Single and Multi-Select filters use a single param key
        const { paramKey } = config as
          | SingleSelectFilterConfig
          | MultiSelectFilterConfig;
        if (urlParams.has(paramKey))
          result.set(paramKey, urlParams.get(paramKey)!);
        break;
      }
    }
  }

  return result;
};
