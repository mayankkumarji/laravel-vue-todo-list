<template>
    <div class="circular-progress">
        <v-progress-circular
        color="primary"
        indeterminate
        ></v-progress-circular>
    </div>
</template>

<style scoped lang="scss">
    .circular-progress {
        height: 72px;
        width: 100%;
        position: absolute;
        background: rgba(0,0,0, .18);
        z-index: 1000;
        div {
            width: 100%!important;
            top: 50%;
            transform: translate(0, -50%);
        }
    }
</style>
