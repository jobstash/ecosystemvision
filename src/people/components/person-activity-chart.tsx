'use client';

import { useEffect, useMemo, useRef } from 'react';

import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { assembleECharts, type ChartAssemblyInput } from 'flint-chart';

import { PersonProfile } from '@/people/core/schemas';

echarts.use([CanvasRenderer, GridComponent, BarChart, TooltipComponent]);

export const PersonActivityChart = ({
  activity,
}: {
  activity: PersonProfile['activity'];
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const input = useMemo<ChartAssemblyInput>(
    () => ({
      data: {
        values: activity.map((point) => ({
          period: point.period,
          commits: point.commitCount,
          organization: point.organizationName,
        })),
      },
      semantic_types: {
        period: 'DateTime',
        commits: 'Quantity',
        organization: 'Category',
      },
      chart_spec: {
        chartType: 'Bar Chart',
        encodings: {
          x: { field: 'period' },
          y: { field: 'commits' },
          color: { field: 'organization' },
        },
        baseSize: { width: 720, height: 220 },
      },
    }),
    [activity],
  );

  useEffect(() => {
    if (!rootRef.current || !activity.length) return;
    const chart = echarts.init(rootRef.current);
    const option = assembleECharts(input);
    chart.setOption({
      ...option,
      backgroundColor: 'transparent',
      textStyle: { color: '#d9dde7', fontFamily: 'Inter, sans-serif' },
      xAxis: {
        ...option.xAxis,
        axisLabel: { color: '#818899' },
        axisLine: { lineStyle: { color: '#343843' } },
      },
      yAxis: {
        ...option.yAxis,
        axisLabel: { color: '#818899' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.07)' } },
      },
      tooltip: {
        ...option.tooltip,
        trigger: 'axis',
        backgroundColor: '#15171c',
        borderColor: '#343843',
        textStyle: { color: '#f7f8fb' },
      },
    });
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [activity.length, input]);

  return activity.length ? (
    <div
      ref={rootRef}
      className="h-[230px] w-full"
      role="img"
      aria-label="Monthly internal commit activity by organization"
    />
  ) : null;
};
