<template>
    <div>
        <div class="common-layout">
            <el-container>
                <SiderMenu/>
                <el-container direction="vertical">
                    <TopHeader/>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </div>
        
    </div>
</template>
<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue';
import SiderMenu from '../components/mainbox/SideMenu.vue';
</script>