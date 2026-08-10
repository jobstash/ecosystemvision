'use client';

import { useMemo } from 'react';

import { OrthographicView } from '@deck.gl/core';
import { ArcLayer, IconLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { scaleSqrt } from 'd3-scale';

import { PeopleAtlas, PeopleAtlasNode } from '@/people/core/schemas';

interface Props {
  atlas: PeopleAtlas;
  selectedOrganizationKey?: string;
  onSelect: (node: PeopleAtlasNode) => void;
}

type AtlasArc = PeopleAtlas['edges'][number] & {
  source: [number, number, number];
  target: [number, number, number];
};

export const EcosystemAtlas = ({
  atlas,
  selectedOrganizationKey,
  onSelect,
}: Props) => {
  const positions = useMemo(
    () => new Map(atlas.nodes.map((node) => [node.organizationKey, node])),
    [atlas.nodes],
  );
  const maximum = Math.max(1, ...atlas.nodes.map((node) => node.activePeople));
  const radius = scaleSqrt().domain([0, maximum]).range([3, 34]).clamp(true);
  const arcs = useMemo(
    () =>
      atlas.edges.flatMap<AtlasArc>((edge) => {
        const source = positions.get(edge.sourceOrganizationKey);
        const target = positions.get(edge.destinationOrganizationKey);
        return source && target
          ? [
              {
                ...edge,
                source: [source.x, source.y, 0],
                target: [target.x, target.y, 0],
              },
            ]
          : [];
      }),
    [atlas.edges, positions],
  );
  const labels = useMemo(() => {
    const selected = selectedOrganizationKey
      ? positions.get(selectedOrganizationKey)
      : undefined;
    return Array.from(
      new Map(
        [...atlas.nodes]
          .sort((left, right) => right.activePeople - left.activePeople)
          .slice(0, 80)
          .concat(selected ? [selected] : [])
          .map((node) => [node.organizationKey, node]),
      ).values(),
    );
  }, [atlas.nodes, positions, selectedOrganizationKey]);
  const iconNodes = useMemo(() => {
    const selected = selectedOrganizationKey
      ? positions.get(selectedOrganizationKey)
      : undefined;
    return Array.from(
      new Map(
        atlas.nodes
          .filter((node) => node.logoUrl)
          .sort((left, right) => right.activePeople - left.activePeople)
          .slice(0, 120)
          .concat(selected?.logoUrl ? [selected] : [])
          .map((node) => [node.organizationKey, node]),
      ).values(),
    );
  }, [atlas.nodes, positions, selectedOrganizationKey]);

  if (!atlas.available) {
    return <Empty text="The organization atlas is being materialized." />;
  }
  if (!atlas.nodes.length) {
    return <Empty text="No organizations exist for this period." />;
  }

  const layers = [
    new ArcLayer<AtlasArc>({
      id: 'people-movement-arcs',
      data: arcs,
      getSourcePosition: (edge) => edge.source,
      getTargetPosition: (edge) => edge.target,
      getSourceColor: [89, 225, 183, 120],
      getTargetColor: [141, 162, 255, 150],
      getWidth: (edge) => Math.max(1, Math.log2(edge.people + 1)),
      widthMinPixels: 1,
      widthMaxPixels: 8,
      greatCircle: false,
      pickable: false,
    }),
    new ScatterplotLayer<PeopleAtlasNode>({
      id: 'people-organization-nodes',
      data: atlas.nodes,
      getPosition: (node) => [node.x, node.y, 0],
      getRadius: (node) => radius(node.activePeople),
      radiusUnits: 'pixels',
      radiusMinPixels: 2,
      radiusMaxPixels: 44,
      getFillColor: (node) => nodeColor(node, selectedOrganizationKey),
      getLineColor: (node) =>
        node.organizationKey === selectedOrganizationKey
          ? [255, 255, 255, 255]
          : [255, 255, 255, 55],
      getLineWidth: (node) =>
        node.organizationKey === selectedOrganizationKey ? 3 : 1,
      lineWidthUnits: 'pixels',
      stroked: true,
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 60],
      onClick: ({ object }) => object && onSelect(object),
      updateTriggers: {
        getFillColor: [selectedOrganizationKey],
        getLineColor: [selectedOrganizationKey],
        getLineWidth: [selectedOrganizationKey],
      },
      transitions: {
        getPosition: 500,
        getRadius: 350,
        getFillColor: 350,
      },
    }),
    new IconLayer<PeopleAtlasNode>({
      id: 'people-organization-logos',
      data: iconNodes,
      getPosition: (node) => [node.x, node.y, 1],
      getIcon: (node) => ({
        url: node.logoUrl ?? '',
        width: 128,
        height: 128,
        anchorX: 64,
        anchorY: 64,
      }),
      getSize: (node) =>
        node.organizationKey === selectedOrganizationKey ? 28 : 17,
      sizeUnits: 'pixels',
      pickable: false,
      updateTriggers: {
        getSize: [selectedOrganizationKey],
      },
      transitions: { getPosition: 500, getSize: 350 },
    }),
    new TextLayer<PeopleAtlasNode>({
      id: 'people-organization-labels',
      data: labels,
      getPosition: (node) => [node.x, node.y, 1],
      getText: (node) => node.organizationName,
      getSize: (node) =>
        node.organizationKey === selectedOrganizationKey ? 14 : 11,
      sizeUnits: 'pixels',
      getColor: (node) =>
        node.organizationKey === selectedOrganizationKey
          ? [255, 255, 255, 255]
          : [224, 229, 238, 190],
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'bottom',
      getPixelOffset: (node) => [0, -radius(node.activePeople) - 4],
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      billboard: true,
      pickable: false,
    }),
  ];

  return (
    <div className="relative h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#090b0f]">
      <DeckGL
        views={new OrthographicView({ id: 'people-atlas', controller: true })}
        initialViewState={{
          target: [0, 0, 0],
          zoom: -1,
          minZoom: -3,
          maxZoom: 8,
        }}
        controller
        layers={layers}
        getTooltip={({ object }) =>
          object
            ? {
                text: `${object.organizationName}\n${object.activePeople.toLocaleString()} active people · ${object.activeMaintainers.toLocaleString()} maintainers\n${formatDelta(object.change)} vs comparison period`,
                style: {
                  backgroundColor: '#15171c',
                  color: '#f7f8fb',
                  border: '1px solid #343843',
                  borderRadius: '10px',
                  fontSize: '12px',
                  padding: '10px',
                },
              }
            : null
        }
      />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-[11px] text-white/50 backdrop-blur">
        Node area = active internal people · color = growth or contraction
      </div>
    </div>
  );
};

const nodeColor = (
  node: PeopleAtlasNode,
  selectedOrganizationKey?: string,
): [number, number, number, number] => {
  if (node.organizationKey === selectedOrganizationKey) {
    return [246, 186, 119, 245];
  }
  if (node.change > 0) return [84, 227, 181, 205];
  if (node.change < 0) return [244, 123, 132, 205];
  return [141, 162, 255, node.activePeople ? 175 : 65];
};

const formatDelta = (value: number) =>
  value === 0 ? 'No change' : `${value > 0 ? '+' : ''}${value.toLocaleString()}`;

const Empty = ({ text }: { text: string }) => (
  <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 text-sm text-white/45">
    {text}
  </div>
);
