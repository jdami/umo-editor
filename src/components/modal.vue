<template>
  <t-dialog
    :visible="visible"
    :attach="container"
    :prevent-scroll-through="false"
    placement="center"
    draggable
    destroy-on-close
    v-bind="$attrs"
  >
    <template #header>
      <icon v-if="$attrs.icon" :name="$attrs.icon" />
      <span>{{ $attrs.title }}</span>
    </template>
    <slot />
  </t-dialog>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const { container } = useStore()
</script>

<style lang="less" scoped></style>
