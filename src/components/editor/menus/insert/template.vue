<template>
  <editor-menus-button
    v-if="options.templates && options.templates.length > 0"
    button-type="dropdown"
    huge-button
    overlay-class-name="templates-dropdown"
  >
    <icon name="template" />
    <template #text>
      <p class="button-text">模板</p>
    </template>
    <template #dropmenu>
      <t-dropdown-menu>
        <t-dropdown-item
          v-for="item in options.templates"
          :key="item.value"
          :value="item.value"
          :divider="item.divider"
          :class="{
            'has-description': item.description && item.description !== '',
          }"
          @click="setTemplate(item)"
        >
          <div class="title">{{ item.title }}</div>
          <div
            v-if="item.description && item.description !== ''"
            class="description"
          >
            {{ item.description }}
          </div>
        </t-dropdown-item>
      </t-dropdown-menu>
    </template>
  </editor-menus-button>
</template>

<script setup>
const { options, editor } = useStore()

const setTemplate = ({ content }) => {
  if (!content || !editor.value) return
  editor.value.commands.insertContent(content)
}
</script>

<style lang="less">
.templates-dropdown {
  .umo-dropdown__item-text {
    padding: 5px 5px;
    min-width: 200px;
    max-width: 320px;
  }
  .title {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .description {
    color: var(--umo-text-color-light);
    white-space: normal;
    line-height: 1.4;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
