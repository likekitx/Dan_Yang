<template>
    <div class="uploadmain">
        <div class="uploadLeft">
            <div class="leftmain">
          
            </div>
        </div>
        <div class="uploadRight">

        </div>
    </div>

</template>
<script setup>

</script>
<style lang="scss" scoped>
.uploadmain{
    width: 100%;
    height: 80%;
    border-radius: 7px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
    >.uploadLeft{
        width: 60%;
        display: flex;
        flex-direction: column;
        background-color: azure;
        >.leftmain{
            margin-left: 5%;
            margin-top: 3%;
            background-color: rgb(86, 88, 88);
            width: 50%;
            height: 90%;
           
           
        }
    }
    >.uploadRight{
        width: 40%;
    }
}

</style>