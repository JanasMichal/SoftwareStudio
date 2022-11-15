const Movies={template:`
<div>
<button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#movieModal" @click="addClick()">Add Movie</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            ID
        </th>
        <th>
            Title
        </th>
        <th>
            Year of production
        </th>
        <th>
            Type
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="movie in movies">
        <td>{{movie.Id}}</td>
        <td>{{movie.Title}}</td>
        <td>{{movie.YearOfProduction}}</td>
        <td>{{movie.Type}}</td>
        <td>
            <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#movieModal" @click="editClick(movie)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(movie.Id)" class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</table>
<div class="modal fade" id="movieModal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="movieModalLabel">{{modalTitle}}</h5>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label">Title</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="Title">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Year of Production</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="YearOfProduction">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Type</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="Type">
                        </div>
                    </div>
                    <div class="submit m-3">
                        <button type="submit" @click="createClick()" v-if="Id==0" class="btn btn-primary">Add</button>
                        <button type="submit" @click="updateClick()" v-if="Id!=0" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
`,

data(){
    return{
        movies:[],
        Id: "",
        modalTitle: "",
        Title: "",
        YearOfProduction: "",
        Type: ""
    }
},
methods:{
    refreshData(){
        axios.get("https://localhost:5001/api/Movie")
        .then((response) => {
            this.movies = response.data;
        });
    },
    addClick(){
        this.modalTitle = "Add Movie";
        this.Id = "";
        this.Title = "";
        this.Type = "";
        this.YearOfProduction = "";
    },
    editClick(movie){
        this.modalTitle = "Edit Movie";
        this.Id = movie.Id;
        this.Title = movie.Title;
        this.Type = movie.Type;
        this.YearOfProduction = movie.YearOfProduction;
    },
    createClick(){
        axios.post("https://localhost:5001/api/Movie", {
            Title:this.Title,
            Type:this.Type,
            YearOfProduction:this.YearOfProduction
        })
        .then((response) => {
            alert(response.data);
            this.refreshData()
        })
    },
    updateClick(){
        axios.put("https://localhost:5001/api/Movie", {
            Id:this.Id,
            Title:this.Title,
            Type:this.Type,
            YearOfProduction:this.YearOfProduction,
        })
        .then((response) => {
            alert(response.data);
            this.refreshData()
        })
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete("https://localhost:5001/api/Movie/"+id)
        .then((response) => {
            alert(response.data);
            this.refreshData();
        })
    }
},
mounted:function(){
    this.refreshData();
}
}