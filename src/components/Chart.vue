<template>
  <div class="card flex justify-center">
    <canvas ref="chartCanvas" class="w-full md:w-[30rem]"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'; // remove defineProps import
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

// Props: values for the chart
interface PieChartProps {
  sent: number
  bounced: number
  deferred: number
}

// Use defineProps (no import needed in script setup)
const props = defineProps<PieChartProps>();

// Ref for canvas
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Chart instance
let pieChart: Chart | null = null;

// Generate chart data based on props
const getChartData = () => {
  const style = getComputedStyle(document.body);

  return {
    labels: ['Sent', 'Bounced', 'Deferred'],
    datasets: [
      {
        data: [props.sent, props.bounced, props.deferred],
        backgroundColor: [
          style.getPropertyValue('--p-cyan-500') || '#00bcd4',
          style.getPropertyValue('--p-orange-500') || '#ff9800',
          style.getPropertyValue('--p-gray-500') || '#9e9e9e',
        ],
        hoverBackgroundColor: [
          style.getPropertyValue('--p-cyan-400') || '#26c6da',
          style.getPropertyValue('--p-orange-400') || '#ffa726',
          style.getPropertyValue('--p-gray-400') || '#bdbdbd',
        ],
      },
    ],
  };
};

// Chart options
const getChartOptions = () => {
  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--p-text-color') || '#333';

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
};

// Initialize chart
const renderChart = () => {
  if (!chartCanvas.value) return;

  if (pieChart) {
    pieChart.data = getChartData();
    pieChart.options = getChartOptions();
    pieChart.update();
  } else {
    pieChart = new Chart(chartCanvas.value, {
      type: 'pie',
      data: getChartData(),
      options: getChartOptions(),
    });
  }
};

onMounted(renderChart);

// Update chart when props change
watch(() => [props.sent, props.bounced, props.deferred], renderChart);

// Clean up
onBeforeUnmount(() => {
  if (pieChart) pieChart.destroy();
});
</script>

<style scoped>
canvas {
  max-height: 250px;
}
</style>
