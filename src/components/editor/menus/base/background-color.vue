<template>
  <editor-menus-button
    :tooltip="tooltip"
    button-type="popup"
    popup-handle="arrow"
    :popup-visible="popupVisible"
    @toggle-popup="togglePopup"
  >
    <icon
      name="background-color"
      class="icon-background-color"
      :style="{
        background: editor?.getAttributes('highlight')?.color || currentColor,
      }"
    />
    <template #content>
      <toolbar-color-picker
        :default-color="defaultColor"
        @change="colorChange"
      />
    </template>
  </editor-menus-button>
</template>

<script setup>
const props = defineProps({
  tooltip: {
    type: String,
    default: '字体背景颜色',
  },
  modeless: {
    type: Boolean,
    default: false,
  },
  defaultColor: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['change'])

let { popupVisible, togglePopup } = usePopup()
const { editor } = useStore()

let currentColor = $ref()

const colorChange = (color) => {
  currentColor = color
  popupVisible.value = false

  if (props.modeless) {
    emits('change', currentColor)
    return
  }

  if (color !== '') {
    editor.value?.chain().focus().setHighlight({ color }).run()
  } else {
    editor.value?.chain().focus().unsetHighlight().run()
  }
}
</script>

<style lang="less" scoped>
.icon-background-color {
  border-radius: 2px;
}
</style>
