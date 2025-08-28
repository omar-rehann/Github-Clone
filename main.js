let inpt = document.querySelector(".text");
let btn = document.querySelector(".send");
let left_content = document.querySelector(".left_content");
let all_btn = document.querySelectorAll(".buttons button");
let content = document.querySelector(".all_content .row");

btn.onclick = function() {
    if (inpt.value == "" || !isNaN(inpt.value)) {
        swal({
                title: "Invalid Input",
                text: " Invalid input! Please check your data and try again",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    } else {
        content.innerHTML = '';
        let myrequest = new XMLHttpRequest();
        myrequest.open("GET", `https://api.github.com/users/${inpt.value}/repos`);
        myrequest.send();
        myrequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let i = 0; i < data.length; i++) {
                    let result = `
        <div class="image">
            <img src="${data[i].owner.avatar_url}" alt="User photo">
        </div>
        <div class="info">
            <h4>${data[i].owner.login}</h4>
            <h5>${inpt.value}</h5>
            <a href="${data[i].owner.html_url}" target="_blank">
                <i class="fab fa-github"></i> See You GitHub
            </a>
        </div>
        <div class="end">
            <h5><span>${data.length}</span> Repositories</h5>
        </div>
    `
                    let result_two = `
                    
                             <div class="col-md-4 col-12">
                                <div class="box">

                                    <div class="names">
                                        <h5>${data[i].name}</h5>
                                        <h5>${data[i].visibility}</h5>

                                    </div>
                                    <div class="icon">
                                        <h6><i class="fab fa-css3-alt"></i> ${data[i].language}</h6>
                                        <h6><i class="fas fa-star"></i> ${data[i].watchers}</h6>
                                        <h6><i class="fas fa-code-branch"></i> ${data[i].default_branch}</h6>
                                    </div>

                                </div>
                            </div>

                                `
                    left_content.innerHTML = result;
                    content.innerHTML += result_two;
                }

            }
        }
    }
    inpt.value = "";


}