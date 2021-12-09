<template>
  <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="noteName"
      label="笔记名字"
      width="300"
      >
    </el-table-column>
    <el-table-column
      prop="noteCreateTime"
      label="创建日期"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作ψ(._. )>"
      width="500">
      <template slot-scope="scope">
        <el-button type="primary" @click="editNote(scope.row)">编辑</el-button>
        <el-button type="danger" @click="deleteNote(scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>     

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      getNoteList() {
        this.$http.get('notes/noteList',{
            params : {
                userId : this.$store.state.userId
            }
        })
        .then(({data}) => {
            this.tableData = data.data
            for (var i=0;i<this.tableData.length;i++){ 
                var tmp = this.tableData[i].noteCreateTime + '';
                this.tableData[i].noteCreateTime = tmp.replace('T',' ')
            }
        })
      },
      deleteNote(row){
          console.log(row);
            this.$http({
              method: 'post',
              url: 'notes/deleteNote',
              data: row.noteId
            })
            .then(({data}) => {
                this.getNoteList();
                console.log(data)
            })
      },
      editNote(row){
            this.$store.state.noteId = row.noteId;
            this.$router.push({path: '/editor'})
      }
    },
    data() {
      return {
        tableData: []
      }
    },
    create() {

    },
    mounted() {
        this.getNoteList();
    }
  }
</script>

<style>

</style>