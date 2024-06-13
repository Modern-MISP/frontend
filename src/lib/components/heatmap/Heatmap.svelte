<script lang="ts">
  import SvelteHeatmap from 'svelte-heatmap';
  import Select from '../form/Select.svelte';

  type dateData = {
    date: string;
    value: number;
  };

  type settings = {
    allowOverflow?: boolean;
    cellGap?: number;
    cellRadius?: number;
    cellSize?: number;
    colors?: string[];
    dayLabelWidth?: number;
    dayLabels?: string[];
    fontColor?: string;
    fontFamily?: string;
    fontSize?: number;
    emptyColor?: string;
    monthGap?: number;
    monthLabelHeight?: number;
    monthLabels?: string[];
    startDate?: string;
    endDate?: string;
    view?: 'monthly' | 'yearly';
  };

  type dropdown = {
    options: { label: string; value: string }[];
  };

  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };

  /**
   * Title of this component.
   */
  export let title = '';
  /**
   * The description of this component.
   */
  export let description: string = '';
  /**
   * The data that will be displayed in the heatmap.
   */
  export let data: dateData[];
  /**
   * The settings for the heatmap.
   */
  export let settings: settings = {};
  /**
   * The dropdown settings for the heatmap.
   */
  export let dropdown: dropdown | undefined;

  const defaultSettings = {
    data: data,
    allowOverflow: true,
    cellGap: 1.5,
    cellRadius: 2,
    cellSize: 8,
    colors: ['#a1dab4', '#42b6c4', '#2c7fb9', '#263494'],
    dayLabelWidth: 30,
    dayLabels: ['', 'Mon', '', 'Web', '', 'Fri', ''],
    fontColor: 'rgba(var(--ctp-text), var(--tw-text-opacity))',
    fontFamily: 'sans-serif',
    fontSize: 6.3,
    emptyColor: '#45475a',
    monthGap: 16,
    monthLabelHeight: 8,
    monthLabels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    startDate: data[0].date,
    endDate: data[data.length - 1].date,
    view: 'monthly'
  };

  let heatmapData = {
    ...defaultSettings,
    ...settings
  };

  $: height =
    6 * (heatmapData.cellSize + heatmapData.cellGap) -
    heatmapData.cellGap +
    heatmapData.monthLabelHeight +
    heatmapData.fontSize;
  $: width =
    (7 * (heatmapData.cellSize + heatmapData.cellGap) -
      heatmapData.cellGap +
      heatmapData.monthGap) *
      7 -
    heatmapData.monthGap;
  function calcX(index: number) {
    return (heatmapData.cellSize + heatmapData.cellGap) * index;
  }
</script>

<!--
  @component
  A Heatmap component.
  This component is a wrapper around the svelte-heatmap component.
 -->
<div class="h-full">
  <div class="gap-4 text-text w-full h-full p-4 rounded-lg bg-surface0 {clazz}">
    <h1 class="text-2xl font-bold text-sky {clazz}">{title}</h1>
    <span class="">{description}</span>
    {#if typeof dropdown !== 'undefined'}
      <svelte:component this={Select} {...dropdown} />
    {/if}
    <div style="margin: 3rem">
      <SvelteHeatmap {...heatmapData} />
    </div>
    <svg viewBox={`0 0 ${width} ${height}`} style="margin-left: 3rem">
      <rect
        fill={heatmapData.emptyColor}
        height={heatmapData.cellSize}
        width={heatmapData.cellSize}
        rx={heatmapData.cellRadius}
        x="0"
      ></rect>
      {#each heatmapData.colors as color, index}
        <rect
          fill={color}
          height={heatmapData.cellSize}
          width={heatmapData.cellSize}
          rx={heatmapData.cellRadius}
          x={calcX(index + 1)}
        ></rect>
      {/each}
    </svg>
  </div>
</div>
