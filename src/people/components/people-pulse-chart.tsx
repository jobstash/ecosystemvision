'use client';

import { useEffect, useMemo, useRef } from 'react';

import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { assembleECharts, type ChartAssemblyInput } from 'flint-chart';

import { PeopleOverview } from '@/people/core/schemas';

echarts.use([
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  LineChart,
  TooltipComponent,
]);

interface Props {
  overview: PeopleOverview;
}

export const PeoplePulseChart = ({ overview }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const input = useMemo<ChartAssemblyInput>(
    () => ({
      data: {
        values: overview.points.flatMap((point) => [
          {
            period: point.period,
            measure: 'Active people',
            value: point.activePeople,
          },
          {
            period: point.period,
            measure: 'Maintainers',
            value: point.activeMaintainers,
          },
          {
            period: point.period,
            measure: 'Active leads',
            value: point.activeLeads,
          },
        ]),
      },
      semantic_types: {
        period: 'DateTime',
        measure: 'Category',
        value: 'Quantity',
      },
      chart_spec: {
        chartType: 'Line Chart',
        title: 'People active across the ecosystem',
        subtitle: 'Canonical internal employees, maintainers, and active leads',
        encodings: {
          x: { field: 'period' },
          y: { field: 'value' },
          color: { field: 'measure' },
        },
        baseSize: { width: 900, height: 300 },
      },
    }),
    [overview.points],
  );

  useEffect(() => {
    if (!rootRef.current || !overview.points.length) return;
    const chart = echarts.init(rootRef.current, undefined, {
      renderer: 'canvas',
    });
    const option = assembleECharts(input);
    chart.setOption({
      ...option,
      backgroundColor: 'transparent',
      color: ['#54e3b5', '#8da2ff', '#f6ba77'],
      textStyle: { color: '#d9dde7', fontFamily: 'Inter, sans-serif' },
      title: {
        ...option.title,
        textStyle: { color: '#f7f8fb', fontSize: 16, fontWeight: 500 },
        subtextStyle: { color: '#818899', fontSize: 12 },
      },
      legend: {
        ...option.legend,
        textStyle: { color: '#aeb5c3' },
      },
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
  }, [input, overview.points.length]);

  if (!overview.available) {
    return <Unavailable text="People activity is being materialized." />;
  }
  if (!overview.points.length) {
    return <Unavailable text="No activity exists in the selected period." />;
  }
  return (
    <div
      ref={rootRef}
      className="h-[320px] w-full"
      role="img"
      aria-label="Time series of active internal people, maintainers, and active leads"
    />
  );
};

const Unavailable = ({ text }: { text: string }) => (
  <div className="flex h-[240px] items-center justify-center text-sm text-white/45">
    {text}
  </div>
);
