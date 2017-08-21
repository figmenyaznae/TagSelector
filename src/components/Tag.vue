<template>
  <div class="tag">
    <div class="tag-image">
      <div v-bind:class="styleComplimented"
           v-on:click="onComplimentClick">
        &#10060;
      </div>
      <div class="lower-panel">
        <div v-bind:class="styleIntersected"
             v-on:click="onIntersectClick">
          &amp;
        </div>
        <div v-bind:class="styleUnied"
             v-on:click="onUnionClick">
          +
        </div>
      </div>
    </div>
    <span class="tag-title">{{ data.title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    state: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    styleComplimented: function () {
      return {
        selected: this.state == 3,
        compliment: true
      };
    },
    styleIntersected: function () {
      return {
        selected: this.state == 1,
        intersect: true
      };
    },
    styleUnied: function () {
      return {
        selected: this.state == 2,
        union: true
      };
    },
  },
  methods: {
    onComplimentClick: function () {
      //this.state = this.state==3 ? 0 : 3
      this.$emit('compliment', this.data['.key']);
    },
    onIntersectClick: function () {
      //this.state = this.state==1 ? 0 : 1
      this.$emit('intersect', this.data['.key']);
    },
    onUnionClick: function () {
      //this.state = this.state==2 ? 0 : 2
      this.$emit('union', this.data['.key']);
    },
  },
}
</script>