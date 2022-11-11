<template>
    <div class="uploadmain">
        <div class="uploadLeft">
            <div class="leftmain">
                <p>发布视频</p>
              <textarea type="text"  class="inputup" placeholder="请输入作品描述"></textarea>
              <div class="btn">
                <button>#话题</button>
                <button>@好友</button>
            </div>
            </div>
            
        </div>
        <div class="uploadRight">
            <div class="video">
                <vue3VideoPlay
                  :="options"
                  :src="(videoSrc+srcData)"
              />
            </div>
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
        width: 50%;
        display: flex;
        flex-direction: column;
        >.leftmain{
            margin-left: 5%;
            margin-top: 3%;
            width: 50%;
            height: 90%;
            display: flex;
            flex-direction: column;
            >.inputup{
                width: 50%;
                height: 20%;
                border-radius: 7px;
                border:0;
                background-color:rgba(241,241,241,.98);
                resize: none;
            }
            >.btn{
                margin-top: 5px;
                padding-left: 35%;
            }
            
           
        }
    }
    >.uploadRight{
        width: 40%;
        >.video{
            margin-top: 60px;
        }
    }
}

</style>