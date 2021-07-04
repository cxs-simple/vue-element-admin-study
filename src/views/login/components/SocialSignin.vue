<template>
  <div class="sign-container">
    <span class="sign-btn" @click="wechatHandleClick()">
      <i class="iconfont icon-weixinfang icon"></i>
    </span>
    <span class="sign-btn" @click="tencentHandleClick()">
      <i class="iconfont icon-QQfang icon"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SocialSignin',
  methods: {
    wechatHandleClick() {
      alert('wechat ok')
    },
    tencentHandleClick() {
      alert('QQ ok')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sign-container {
    display: flex;
    justify-content: center;

    .sign-btn {
      cursor: pointer;
    }

    .icon {
      font-size: 50px;
      color: #fff;
    }
  
    .icon-weixinfang {
      color: #24da70;
    }

    .icon-QQfang {
      color: #6BA2D6;
    }
  }

</style>