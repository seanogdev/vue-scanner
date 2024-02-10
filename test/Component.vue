<template>
  <ButtonComponent class="w-4">Button component</ButtonComponent>
  <button-component class="w-4" filterTest>Button component 2</button-component>
  <button type="button">Not a component</button>
  <Test
    v-bind="{
      test: 4,
      t,
    }"
  ></Test>

  <SlotTest>
    <template>
      <div>Slot content</div>
    </template>
    <template #prepend>
      <div>Prepend slot content</div>
    </template>
  </SlotTest>
</template>

<script setup>
const t = 'test';
console.log('Hi! I am a script setup block!');
</script>
