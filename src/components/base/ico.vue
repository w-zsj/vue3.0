<template>
  <div :class="`ico ico-${name}`">
    <i></i>
  </div>
</template>
<script>
const icos = [
  "collection",
  "collection-icon",
  "dot",
  "right-arrow",
  "sales-location",
  "icon-vip",
  "posting-like",
  "posting-share",
  "posting-like-gray",
  "posting-like-small",
  "posting-like-gray-small",
  "gps-icon",
  "more-black",
  "ranking-white-shadow",
  "vip-small",
  "image-top",
  "more-right",
  "posting-like-16",
  "posting-like-gray-16",
  "posting-like-22",
  "posting-like-gray-22",
];
export default {
  name: "Ico",
  props: {
    name: { type: String, validator: (val) => icos.indexOf(val) !== -1 },
  },
};
</script>
<style lang="scss">
.ico {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;

  i {
    transform-origin: left top;
    transform: scale(0.5);
  }
}

.ico-gps-icon {
  width: 16 * $px;
  height: 18 * $px;
  i {
    @include mix-gps-icon();
  }
}
.ico-collection {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-collection();
  }
}
.ico-collection-icon {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-collection-icon();
  }
}
.ico-dot {
  width: 22 * $px;
  height: 22 * $px;
  i {
    @include mix-dot();
  }
}
.ico-right-arrow {
  width: 12 * $px;
  height: 12 * $px;
  i {
    @include mix-right-arrow();
  }
}

.ico-sales-location {
  width: 16 * $px;
  height: 17 * $px;
  i {
    @include mix-sales-location();
  }
}

.ico-icon-vip {
  width: 9 * $px;
  height: 10.5 * $px;
  i {
    @include mix-icon-vip();
  }
}

.ico-posting-like {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-posting-like();
  }
}
.ico-posting-share {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-posting-share();
  }
}
.ico-posting-like-16 {
  width: 16 * $px;
  height: 16 * $px;
  i {
    @include mix-posting-like-16();
  }
}
.ico-posting-like-gray-16 {
  width: 16 * $px;
  height: 16 * $px;
  i {
    @include mix-posting-like-gray-16();
  }
}
.ico-posting-like-22 {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-posting-like-22();
  }
}
.ico-posting-like-gray-22 {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-posting-like-gray-22();
  }
}
.ico-posting-like-gray {
  width: 26 * $px;
  height: 26 * $px;
  i {
    @include mix-posting-like-gray();
  }
}
.ico-posting-like-gray-small {
  width: 22 * $px;
  height: 22 * $px;
  i {
    @include mix-posting-like-gray-small();
  }
}
.ico-posting-like-small {
  width: 22 * $px;
  height: 22 * $px;
  i {
    @include mix-posting-like-small();
  }
}
.ico-ranking-white-shadow {
  width: 22 * $px;
  height: 22 * $px;
  i {
    @include mix-ranking-white-shadow();
  }
}
.ico-vip-small {
  width: 16 * $px;
  height: 16 * $px;
  i {
    @include mix-vip-small();
  }
}
.ico-image-top {
  width: 32 * $px;
  height: 32 * $px;
  i {
    @include mix-image-top();
  }
}
.ico-more-right {
  width: 12 * $px;
  height: 12 * $px;
  i {
    @include mix-more-right();
  }
}

.ico-more-black {
  width: 13 * $px;
  height: 13 * $px;
  i {
    @include mix-more-black();
  }
}
</style>
