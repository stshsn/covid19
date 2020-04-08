<template>
  <div class="MaintenanceModeMark">
    ただいまメンテナンスを行っています。
    </a>
  </div>
</template>

<style lang="scss">
.MaintenanceModeMark {
  z-index: 1;
  top: 0;
  left: 0;
  font-size: 24px;
  width: 100%;
  height: 28px;
  text-align: center;
  background-color: #00adff;
  color: #f7f7f7;
  line-height: 28px;
  opacity: 0.9;

  // mobile view
  @include lessThan($small) {
    height: 30px;
    font-size: 15px;
  }
}
</style>

<script>
export default {
  name: 'MaintenanceModeMark',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
