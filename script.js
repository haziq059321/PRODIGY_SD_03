function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let PhoneNumber = document.getElementById("PhoneNumber").value;

    if (name == "") {
        alert("Name is required");
        return false;
    }

    if (PhoneNumber == "") {
        alert("PhoneNumber is required")
        return false;
    }


    if (email == "") {
        alert("Email is required");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Invalid email")
        return false;
    }

    return true;

}

function ShowData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }
    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.PhoneNumber + "</td>";
        html +=
            '<td><button onclick ="deleteData(' + index + ') " class ="btn btn-danger">Delete</button><button onclick="updateData(' +
            index +
            ')" class ="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;


}
document.onload = ShowData();

function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let PhoneNumber = document.getElementById("PhoneNumber").value;


        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }

        peopleList.push({
            name: name,
            email: email,
            PhoneNumber: PhoneNumber,
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        ShowData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("PhoneNumber").value = "";

    }
}


function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    ShowData();
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("PhoneNumber").value = peopleList[index].PhoneNumber;

    document.querySelector('#update').onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].PhoneNumber = document.getElementById("PhoneNumber").value;
        
            localStorage.setItem("peopleList", JSON.stringify(peopleList));
        ShowData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("PhoneNumber").value = "";

        document.getElementById("submit").style.display = "block";
         document.getElementById("update").style.display = "none";

        }
    }
}