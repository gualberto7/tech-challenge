<script lang="ts" setup>
import { computed, type PropType } from "vue";

const props = defineProps({
  color: {
    type: String as PropType<"primary" | "secondary" | "danger">,
    default: "primary",
  },
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg">,
    default: "md",
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const styles = computed(() => {
  return {
    disabled: props.disabled,
  };
});
</script>

<template>
  <button
    class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-center"
    :class="[color, size, styles]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.primary {
  @apply bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700;
}
.secondary {
  @apply bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700;
}
.danger {
  @apply bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700;
}

.md {
  @apply text-sm px-5 py-2.5;
}
.xs {
  @apply text-xs px-2 py-1;
}

.disabled {
  @apply bg-gray-400 hover:bg-gray-400 cursor-not-allowed;
}
</style>
