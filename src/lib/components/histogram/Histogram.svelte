<script lang="ts">
  import { run } from 'svelte/legacy';

  type histogramData = {
    label: string;
    values: histogramDataTypeValue[];
  };
  type histogramDataType = {
    label: string;
    color: string;
  };
  type histogramDataTypeValue = {
    label: string;
    value: number;
  };
  type colors = {
    [key: string]: string;
  };
  /**
   * Additional classes to be applied to this component.
   */

  interface Props {
    class?: string;
    /**
     * Title of this component.
     */
    title?: string;
    /**
     * The description of this component.
     */
    description?: string;
    /**
     * The data that will be displayed in the histogram.
     */
    data?: histogramData[];
    /**
     * The types of data that will be displayed in the histogram.
     */
    dataTypes?: histogramDataType[];
    /**
     * the histogram dataType that will be displayed in the histogram.
     */
    dataType?: string;
    /**
     * The maximum size of the lable text (in %)
     */
    maxLabelSize?: number;
  }

  let {
    class: clazz = '',
    title = '',
    description = '',
    data = [],
    dataTypes = [],
    dataType = 'all',
    maxLabelSize = 25.5
  }: Props = $props();

  let scale = $state(1);

  let colors: colors = $state({});

  run(() => {
    let total = 0;
    data.forEach(({ values }) => {
      values.forEach(({ value, label }) => {
        if (dataType === label || dataType === 'all') {
          total += value;
        }
      });
    });
    scale = (100 - (maxLabelSize + 0.5)) / total;

    dataTypes.forEach(({ label, color }) => {
      colors[label] = color;
    });
  });

  let offset = 0;

  function calculateBarLength(value: number): string {
    offset += value * scale;
    return `${value * scale}%`;
  }

  function getXWithOffset(index: number): string {
    if (index === 0) {
      offset = 0;
    }
    return `${maxLabelSize + 0.5 + offset}%`;
  }
</script>

<div class="h-full">
  <div class="gap-4 text-ctp-text w-full h-full p-4 rounded-lg bg-ctp-surface0 {clazz}">
    <h1 class="text-2xl font-bold text-ctp-sky {clazz}">{title}</h1>
    <span class="">{description}</span>
    <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
      {#each dataTypes as { label, color }}
        <div>
          <svg width="20rem" height="1.3rem">
            <rect x="0" y="0" width="1rem" height="1rem" fill={color} />
            <text
              x="1.5rem"
              y="0.9rem"
              text-anchor="start"
              fill="rgba(var(--ctp-text), var(--tw-text-opacity))">{label}</text
            >
          </svg>
        </div>
      {/each}
    </div>
    <div>
      {#each data as { label, values }}
        <div style="margin-top: 0.2rem">
          <svg width="100%" height="1.1rem">
            <text
              x="{maxLabelSize}%"
              y="0.9rem"
              overflow="hidden"
              text-anchor="end"
              fill="rgba(var(--ctp-text), var(--tw-text-opacity))">{label} :</text
            >
            {#each values as { label, value }, i}
              {#if dataType === label}
                <rect
                  x="{maxLabelSize + 0.5}%"
                  y="0"
                  width={calculateBarLength(value)}
                  height="1rem"
                  fill={colors[label]}
                />
              {:else if dataType === 'all'}
                <rect
                  x={getXWithOffset(i)}
                  y="0"
                  width={calculateBarLength(value)}
                  height="1rem"
                  fill={colors[label]}
                />
              {/if}
            {/each}
          </svg>
        </div>
      {/each}
    </div>
  </div>
</div>
